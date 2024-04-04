import type { SpotifyAccessToken, SpotifyResponse, SpotifyData, SpotifyDataFulfilled } from '@types'
import type { APIRoute } from 'astro'
import { kv } from '@vercel/kv'

// Spotify OAuth credentials
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
let accessToken: string | null | undefined

export const GET: APIRoute = async () => {
  try {
    const SPOTIFY_REQUEST_FLAG = import.meta.env.PUBLIC_ENABLE_SPOTIFY

    if (SPOTIFY_REQUEST_FLAG === 'false') {
      return new Response('', {
        headers: { 'Content-Type': 'application/problem+json' },
        status: 400
      })
    }
    // Log request times
    const thisRequestTime = Date.now()
    const lastRequestTime: number = Number(await kv.hget('spotify', 'last_request_time'))

    // Handle too many requests (5 second time-out)
    if (thisRequestTime - lastRequestTime < 5 * 1000) {
      // TODO - Use application/problem+json
      return new Response('', {
        headers: { 'Content-Type': 'application/problem+json' },
        status: 400
      })
    }

    // Save latest request time
    await kv.hset('spotify', { last_request_time: Date.now().toString() })

    // Get access token from db if previous access token does not exist
    accessToken = accessToken ?? (await kv.hget('spotify', 'access_token'))

    // Fetch data (assuming a.t. is fine, code handles it in another function)
    const data = await FetchSpotifyData(accessToken!)

    // Set spotify data as last listened to in db
    kv.hset('spotify', { last_data: JSON.stringify(data) })

    // Set headers
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    // Craft response
    return new Response(JSON.stringify({ access_token: accessToken ?? '', ...data }), {
      headers: { 'Content-Type': 'application/json' },
      status: setStatusCode(data)
    })
  } catch (e) {
    // Vercel KV error
    return new Response(
      JSON.stringify({
        type: 'https://vercel.com/docs/storage/vercel-kv/vercel-kv-error-codes',
        title: 'Bad Gateway - Error with Vercel KV',
        detail: 'There was some error using Vercel KV at this endpoint',
        instance: '/api/spotify',
        status: 502,
        accessToken: accessToken ?? ''
      }),
      {
        headers: { 'Content-Type': 'application+problem/json' },
        status: 502
      }
    )
  }
}

/**
 * Queries the Spotify Web API to get the currently playing track.
 * Handles all API type responses.
 * If met with a bad response, it returns a 200 or 400 for the client.
 * @see {@link setStatusCode}
 * @param accessToken - The access token required to access the Spotify Web API.
 * @returns A Promise to an object containing data obtained from Spotify.
 */
const FetchSpotifyData = async (
  accessToken: SpotifyAccessToken['access_token']
): Promise<SpotifyResponse> => {
  try {
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })

    // Handle possible access token expiration
    if (!res.ok && res.status === 401) return RevalidateAccessToken()

    // Handle unexpected revalidation error
    if (!res.ok) return HandleRevalidationError(res)

    // I should only get 200 and 204:
    // https://developer.spotify.com/documentation/web-api/concepts/api-calls
    if (res.status == 204) return Spotify204()
    if (res.status == 200) return await Spotify200(res)

    // Else, it returns an empty body with status code 204
    return SpotifyServerError(res)
  } catch (e) {
    return SpotifyClientError(e)
  }
}

/**
 * Acquires and Access Token from Spotify to access the Spotify API.
 * The Acess token has an expiry time of 1 hour (3600 seconds).
 * This function uses a refresh token along standard client credentials
 * to make the secure request.
 * @returns A Promise to an object containing an access token for the Spotify API
 */
const FetchAccessToken = async (): Promise<SpotifyAccessToken> => {
  try {
    // Send the authorization request
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken!,
        client_id: clientId!,
        scope: 'user-read-currently-playing'
      })
    })

    if (!res.ok) {
      console.error('Network response was not ok.')
      return { access_token: '' }
    }

    const data: SpotifyAccessToken = await res.json()
    accessToken = data.access_token // TODO - Move to KV store
    return { access_token: data.access_token }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    return { access_token: '' }
  }
}

const RevalidateAccessToken = async () => {
  console.warn('Access token expired. Fetching a new one . . .')
  accessToken = (await FetchAccessToken()).access_token // REVIEW - Handle null?
  await kv.hset('spotify', { access_token: accessToken }) // Put new access token back into database
  /* REVIEW - Return without re-requesting allows the server enough downtime after fetching the new access token
     Before making a new request (instead of calling FetchSpotifyData immediately) */
  return {
    message: 'Access token expired, stored the new one in db'
  }
}

const HandleRevalidationError = async (res: Response) => {
  console.error(await res.json())
  return {
    message: 'Unexpected error requesting data from Spotify, status code ' + res.status
  }
}

const Spotify204 = () => {
  return null
}

const Spotify200 = async (res: Response) => {
  {
    const data: SpotifyData = await res.json()

    // Handle possibility of `data.item` being null, as explained in the docs
    if (data.item === null) return { message: 'Spotify `item` object is null.' }

    // Handle possibility of the currently played object not being a track (like an ad or an episode)
    if (data.currently_playing_type !== 'track')
      return {
        message: 'Currently playing ' + data.currently_playing_type + ' instead of a track.'
      }

    return {
      // Object of track's album name and link
      album: {
        name: data.item.album.name,
        href: `https://open.spotify.com/album/${data.item.album.id}`
      },
      // Array of artists for the track
      artists: data.item.artists.map((artist) => {
        return {
          name: artist.name,
          href: `https://open.spotify.com/artist/${artist.id}`
        }
      }),
      // Track name and link
      track: {
        name: data.item.name,
        href: `https://open.spotify.com/track/${data.item.id}`
      }
    }
  }
}

const SpotifyServerError = (res: Response) => {
  return { error: 'Unexpected error with status code ' + res.status }
}

const SpotifyClientError = (e: unknown) => {
  console.log(e)
  if (!(e instanceof SyntaxError)) return { error: (e as Error).message }
  return { error: 'Syntax error, most likely used .json() on a poor object. ' + e.message }
}

const setStatusCode = (data: SpotifyResponse) => {
  if (data === null || isSDF(data)) return 200
  return 400
}

function isSDF(obj: SpotifyResponse): obj is SpotifyDataFulfilled {
  return 'album' in obj! && 'artists' in obj! && 'track' in obj!
}
