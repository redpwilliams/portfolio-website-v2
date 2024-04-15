import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force'
import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force'

export type SanityResponse = {
  query: string
  result: SanityResult<T>
  ms: number
}

export type SanityResult<T extends Record<string, string | string[] | object | number | boolean>> =
  Array<T>

export type IconProps = {
  icon: IconType
  name: string
  href: string
  style?: CSSProperties
}

export interface AcademiaNode extends SimulationNodeDatum {
  id: string
  completed: boolean
  fixed?: boolean
  x: number
  y: number
}

export interface AcademiaLink extends SimulationLinkDatum<AcademiaNode> {
  source: {
    x: number
    y: number
  }
  target: {
    x: number
    y: number
  }
  value: number
}

export type SpotifyAccessToken = { access_token: string }

/**
 * The format of the json data received from Spotify's response.
 */
export type SpotifyData = {
  /**
   * The currently playing track or episode. Can be null.
   */
  item:
    | readonly {
        /**
         * The album on which the track appears.
         * The album object includes a link in href to full information about the album.
         */
        album: {
          /**
           * The name of the album.
           *  In case of an album takedown, the value may be an empty string.
           */
          name: readonly string
          /**
           * A link to the album in `https://` format.
           */
          href: readonly string
          /**
           * The Spotify ID for the album.
           * Example: "2up3OPMp9Tb4dAKM2erWXQ"
           * @see https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids
           */
          id: readonly string
        }
        /**
         * The artists who performed the track.
         * Each artist object includes a link in href to more detailed information about the artist.
         */
        artists: {
          /**
           * The name of the artist.
           */
          name: readonly string
          /**
           * A link to the artist in `https://` format.
           */
          href: readonly string
          /**
           * The Spotify id for the artist.
           * @see https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids
           */
          id: readonly string
        }[]
        /**
         * The name of the track.
         */
        name: readonly string
        /**
         * The Spotify id for the track.
         * @see https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids
         */
        id: readonly string
      }
    | null
  /**
   * The object type of the currently playing item.
   */
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown'
}

/**
 * The transformed result of the GET request performed by the server.
 */
export type SpotifyResponse = SpotifyDataFulfilled | SpotifyDataRejected

/**
 * The transformed and formatted response for the Client.
 * Only exists if a track is currently playing in real time.
 * If there is no track being played, returns `null`.
 */
export type SpotifyDataFulfilled = {
  /**
   * The track's album.
   */
  album: {
    /**
     * The name of the track's album.
     */
    name: readonly string
    /**
     * A link to the track's album.
     */
    href: readonly string
  }
  /**
   * An array of artists on the track.
   */
  artists: readonly Array<{
    /**
     * The name of the artist.
     */
    name: readonly string
    /**
     * The link to the artist's profile.
     */
    href: readonly string
  }>
  /**
   * Info about the track being played
   */
  track: {
    /**
     * Title of the track
     */
    name: readonly string
    /**
     * Link to the track
     */
    href: readonly string
  }
} | null

/**
 * The response for a bad/rejected call to the Spotify API.
 */
export type SpotifyDataRejected =
  | {
      /**
       * The message for a failed parsing of a response.
       * Occurs when the response from Spotify is good, but a
       * self-made error occurred.
       */
      message: readonly string
    }
  | {
      /**
       * The error from a failed response.
       * Occurs when something unexpected happened, outside of self-made errors.
       */
      error: unknown
    }
