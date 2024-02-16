// Sanity imports
import type { SanityResponse } from '@types'

// D3 imports
import { create } from 'd3-selection'
import { drag, type D3DragEvent } from 'd3-drag'
import { forceSimulation, forceLink, forceCenter, forceCollide, forceManyBody } from 'd3-force'

import type { AcademiaNode, AcademiaLink } from '@types'

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

/**
 * Creates the "Academia" Disjoint Force-Directed Graph
   @see https://observablehq.com/@d3/force-directed-graph/2?intent=fork 
 */
export function initAcademiaGraph() {
  fetch('/src/graph.json')
    .then((response) => response.json())
    .then((data) => {
      // Specify the dimensions of the chart.
      const width = 928
      const height = 600

      // The force simulation mutates links and nodes, so create a copy
      // so that re-evaluating this cell produces the same result.
      const nodes: AcademiaNode[] = data.nodes.map((d: AcademiaNode) => ({ ...d }))
      const links: AcademiaLink[] = data.links.map((d: AcademiaLink) => ({ ...d }))

      // Create a simulation with several forces.
      const simulation = forceSimulation(nodes)
        .force(
          'link',
          forceLink(links).id((d) => (d as AcademiaNode).id)
        )
        .force('charge', forceManyBody().strength(-300))
        .force('center', forceCenter(width / 2, height / 2))
        .force('collide', forceCollide().radius(10)) // Add forceCollide with a small radius
        .alphaDecay(0.02) // Reduce the alpha decay rate to keep the simulation going
        .on('tick', ticked)

      // Create the SVG container.
      const svg = create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('id', 'academia-svg')
        .attr(
          'style',
          'max-width: 100%; height: auto; margin: 0 auto; display: block; cursor: grab'
        )

      // Add a line for each link, and a circle for each node.
      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll()
        .data(links)
        .join('line')
        .attr('stroke-width', Math.sqrt(8))

      const node = svg
        .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll()
        .data(nodes)
        .join('circle')
        .attr('r', 10)
        .attr('fill', (d) => ((d as AcademiaNode).completed ? 'rgba(255, 128, 97, 1)' : '#555'))
        .attr('class', 'academia-circle')
        .attr('id', (d) => ((d as AcademiaNode).fixed ? 'center-node' : null))

      node.append('title').text((d) => d.id)

      // TODO - Fix first node to center of the screen

      // Add a drag behavior.
      // @ts-expect-error drag generic typing too confusing
      node.call(drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

      // Set the position attributes of links and nodes each time the simulation ticks.
      function ticked() {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)

        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
      }

      // Reheat the simulation when drag starts, and fix the subject position.
      function dragstarted(event: D3DragEvent<Element, AcademiaNode, AcademiaNode>) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
        document.getElementById('academia-svg')!.style.cursor = 'grabbing'
      }

      // Update the subject (dragged node) position during drag.
      function dragged(event: D3DragEvent<Element, AcademiaNode, AcademiaNode>) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      // Restore the target alpha so the simulation cools after dragging ends.
      // Unfix the subject position now that it’s no longer being dragged.
      function dragended(event: D3DragEvent<Element, AcademiaNode, AcademiaNode>) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
        document.getElementById('academia-svg')!.style.cursor = 'grab'
      }

      // When this cell is re-run, stop the previous simulation. (This doesn’t
      // really matter since the target alpha is zero and the simulation will
      // stop naturally, but it’s a good practice.)
      // invalidation.then(() => simulation.stop())

      // Create extra styling.
      const styles = document.createElement('style')
      styles.innerHTML = `
      @media (max-width: 60em) {
        #academia-svg circle {
          r: 20px;
        }

        #academia-svg line {
          stroke-width: 8px;
        }
      `

      // Apply to graph.
      const graph = svg.node()!
      graph.appendChild(styles)

      document.getElementById('academia-container')?.append(svg.node()!)
    })
}
