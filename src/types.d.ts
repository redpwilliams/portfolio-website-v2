export type SanityResponse = {
  query: string
  result: SanityResult<T>
  ms: number
}

export type SanityResult<T extends Record<string, string | string[] | object | boolean>> = Array<T>
