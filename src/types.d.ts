export type SanityResponse = {
  query: string
  result: Array<{
    [field: string]: string | boolean | object | string[]
  }>
  ms: number
}
