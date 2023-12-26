import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'

export type SanityResponse = {
  query: string
  result: SanityResult<T>
  ms: number
}

export type SanityResult<T extends Record<string, string | string[] | object | boolean>> = Array<T>

export type IconProps = {
  icon: IconType
  href: string
  style?: CSSProperties
}
