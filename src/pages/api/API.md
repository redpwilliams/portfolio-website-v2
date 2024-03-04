# API Reference

This application has a single RESTful API enpoint at `/api/spotify`.

The GET request returns data about the currently playing track in this format:

```json
access_token: string
data:
  album:
    name: string
    href: string
  artists: {
      name: string
      href: string
    }[]
  track:
      name: string
      href: string
```

If no track is currently playing, an empty `data` object is returned with the request:

```json
access_token: string
data: {}
```

Documentation for the Spotify API route used for the request exists at [here](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track).
