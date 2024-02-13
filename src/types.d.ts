import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3'

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

export type AcademiaData = {
  nodes: AcademiaNode[]
  links: AcademiaLink[]
}

export interface AcademiaNode extends SimulationNodeDatum {
  id: string
  group: string
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
