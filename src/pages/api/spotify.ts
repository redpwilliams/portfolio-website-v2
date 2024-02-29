export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret), // Base64 encode the client ID and client secret
      'Content-Type': 'application/x-www-form-urlencoded' // Set content type to application/x-www-form-urlencoded
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      redirect_uri: 'http://localhost:3000/callback'
    })
  }

  // Send the authorization request
  const f = fetch('https://accounts.spotify.com/api/token', authOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      const token = data.access_token // Access the access token from the response body
      const token_type = data.token_type // Access the token type from the response body
      const expires_in = data.expires_in // Access the expiration time from the response body

      // Use the obtained token for subsequent calls to Spotify Web API services
      console.log('Access Token:', token)
      console.log('Token Type:', token_type)
      console.log('Expires In:', expires_in, 'seconds')
      return new Response(JSON.stringify(data))
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
      return new Response()
    })
  return f
}
