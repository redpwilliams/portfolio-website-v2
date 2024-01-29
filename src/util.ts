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
  stop1.setAttribute('stop-color', 'var(--text-gray-light)')

  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
  stop2.setAttribute('offset', '100%')
  stop2.setAttribute('stop-color', 'var(--text-gray-light)')

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
  const URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${QUERY}`

  let data: SanityResponse

  try {
    const res = await fetch(URL)
    data = await res.json()
  } catch (err) {
    // Fetch failed, returning empty SanityResult array
    // TODO - Craft better error detection
    data = { query: QUERY, result: [], ms: 0 }
  }

  return data
}

/**
 * Extracts the day, month, and year of an ISO-8601 date
 * into its textualized and numeric values, respectively.
 * @param date - The date in ISO-8601 format
 * @returns The textualized/numeric day, month, and year components of the date.
 */
export function formatDate(date: string) {
  const monthTable: Record<string, string> = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  const dateComponents: (string | number)[] = date.split('-')

  // Extract day
  const day = parseInt(dateComponents[2] as string)

  // Extract month
  const month = monthTable[dateComponents[1]]

  // Extract year
  const year = dateComponents[0]

  return { day, month, year }
}
