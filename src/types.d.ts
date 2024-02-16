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
