// Necessary type definitions
import type { SanityResponse } from '@types'

/**
 * Creates and returns the linear gradient attribute for a <defs> definition tag.
 *
 * @param icon - The HTML element to which the linear gradient
 * will be applied.
 * @param index - The index of the linear gradient.
 * @param id - The ID to be assigned to the linear gradient.
 */
export function createLinearGradient(icon: HTMLElement, index: number, id: string) {
  const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
  linearGradient.setAttribute('id', id)
  linearGradient.setAttribute('x1', '0%')
  linearGradient.setAttribute('y1', '100%')
  linearGradient.setAttribute('x2', '100%')
  linearGradient.setAttribute('y2', '0%')

  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
  stop1.setAttribute('offset', '0%')
  stop1.setAttribute('stop-color', 'var(--text-gray-light')

  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
  stop2.setAttribute('offset', '100%')
  stop2.setAttribute('stop-color', 'var(--text-gray-light')

  linearGradient.appendChild(stop1)
  linearGradient.appendChild(stop2)

  return linearGradient
}

/**
 * Fetches data from Sanity studio.
 * @param query - The sanity query to run.
 * @returns A Promise that resolves to an object containing
 * the fetched data.
 */
export async function fetchSanityData(query: string) {
  const PROJECT_ID = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string
  const DATASET = 'production'
  const QUERY = encodeURIComponent(query)
  const URL = `https://${PROJECT_ID}.api.sanity.io/v2022-03-07/data/query/${DATASET}?query=${QUERY}`

  const res = await fetch(URL)
  const data: SanityResponse = await res.json()

  return { data }
}
