// Refresh token, defined on ther server
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
let accessToken: string | null

export async function GET() {
  // Request access token if null
  accessToken = accessToken ?? (await fetchAccessToken()).access_token
  // const data = await fetchAccessToken()
  // console.log(data)
  // console.log(accessToken)
  console.log(await fetchSpotifyData(accessToken!))
  // const data = await console.log(data)
  return new Response(JSON.stringify({ access_token: accessToken ?? '' }))
}

const fetchSpotifyData = async (accessToken: string) => {
  const authOptions = {
    headers: { Authorization: 'Bearer ' + accessToken }
  }
  const f = await fetch('https://api.spotify.com/v1/me/player/currently-playing', authOptions)
  const data = await f.json()
  return data
}

// Using refresh token
const fetchAccessToken = async () => {
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret), // Base64 encode the client ID and client secret
      'Content-Type': 'application/x-www-form-urlencoded' // Set content type to application/x-www-form-urlencoded
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
      //return new Response(JSON.stringify(data))
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
      return ''
      //return new Response()
    })
  return f
}
