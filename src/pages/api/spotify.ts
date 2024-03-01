// Refresh token, defined on ther server
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
let accessToken: string | undefined

export async function GET() {
  // Request access token if null
  accessToken = accessToken ?? (await fetchAccessToken()).access_token

  const data = await fetchSpotifyData(accessToken!)
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  // return new Response(buffer.toString('binary'), {
  //   headers: {
  //     'Content-Type': 'application/pdf'
  //   }
  // })
  return new Response(JSON.stringify({ access_token: accessToken ?? '', data }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * Queries the Spotify Web API to get the currently playing track.
 * @param accessToken - The access token required to access the Spotify Web API.
 * @returns A Response object to be sent to the client
 */
const fetchSpotifyData = async (accessToken: string) => {
  try {
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })

    // TODO - See what response I get when I try to do a 404,
    // I'd like to know how to format the error response for best practice and clarity
    if (!res.ok)
      return {
        data: null,
        message: 'Unexpected error requesting data from Spotify, status code ' + res.status
      }

    // I should only get 200 and 204:
    // https://developer.spotify.com/documentation/web-api/concepts/api-calls
    if (res.status == 204) {
      return {
        data: {}
      }
    }

    if (res.status == 200) {
      const data = await res.json()
      return {
        // Object of track's album name and link
        album: {
          name: data.item.album.name,
          href: `https://open.spotify.com/album/${data.item.album.id}`
        },
        // Array of artists for the track
        artists: data.item.artists.map((artist: { name: string; href: string }) => {
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
    // ^^^ Only works when content is playing (status code 200 most likely, i didn't check)
    // Else, it returns an empty body with status code 204
    return { data: null, message: 'Unexpected error with status code ' + res.status }
  } catch (e: unknown) {
    if (!(e instanceof SyntaxError)) return { data: null, error: e }
    return { data: null, message: 'Most likely used .json() on a poor object' }
  }
}

// Using refresh token
const fetchAccessToken = async (): Promise<{ access_token: string }> => {
  const authOptions = {
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
  }

  // Send the authorization request
  const f = fetch('https://accounts.spotify.com/api/token', authOptions)
    .then((response) => {
      if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      // const token = data.access_token // Access the access token from the response body
      // const token_type = data.token_type // Access the token type from the response body
      // const expires_in = data.expires_in // Access the expiration time from the response body

      accessToken = data.acces_token

      // Use the obtained token for subsequent calls to Spotify Web API services
      // console.log('Access Token:', token)
      // console.log('Token Type:', token_type)
      // console.log('Expires In:', expires_in, 'seconds')
      return data
      // return new Response(JSON.stringify(data))
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
      return ''
      // return new Response()
    })
  return f
}
