import d3 from 'd3'
import type { AcademiaNode, AcademiaLink } from '@types'
import type { D3DragEvent } from 'd3'

export function initAcademiaGraph() {
  // https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork
  fetch('/src/graph.json')
    .then((response) => response.json())
    .then((data) => {
      // Specify the dimensions of the chart.
      const width = 928
      const height = 680

      // Specify the color scale.
      const color = d3.scaleOrdinal(d3.schemeCategory10)

      // The force simulation mutates links and nodes, so create a copy
      // so that re-evaluating this cell produces the same result.
      const links: AcademiaLink[] = data.links.map((d: AcademiaLink) => ({ ...d }))
      const nodes: AcademiaNode[] = data.nodes.map((d: AcademiaNode) => ({ ...d }))

      // Create a simulation with several forces.
      const simulation = d3
        .forceSimulation<AcademiaNode, AcademiaLink>(nodes)
        .force(
          'link',
          d3.forceLink(links).id((d) => (d as AcademiaNode).id)
        )
        .force('charge', d3.forceManyBody())
        .force('x', d3.forceX())
        .force('y', d3.forceY())

      // Create the SVG container.
      const svg = d3
        .create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'max-width: 100%; height: auto;')

      // Add a line for each link, and a circle for each node.
      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', (d) => Math.sqrt(d.value))

      const node = svg
        .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 5)
        .attr('fill', (d) => color(d.group))

      node.append('title').text((d) => d.id)

      // Add a drag behavior.
      // @ts-expect-error drag generic typing too confusing
      node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

      // Set the position attributes of links and nodes each time the simulation ticks.
      simulation.on('tick', () => {
        link
          .attr('x1', (d) => (d.source as AcademiaNode).x!)
          .attr('y1', (d) => (d.source as AcademiaNode).y!)
          .attr('x2', (d) => (d.target as AcademiaNode).x!)
          .attr('y2', (d) => (d.target as AcademiaNode).y!)

        node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!)
      })

      // Reheat the simulation when drag starts, and fix the subject position.
      function dragstarted(event: D3DragEvent<Element, AcademiaNode, AcademiaNode>) {
        console.log(event)
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
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
      }

      // When this cell is re-run, stop the previous simulation. (This doesn’t
      // really matter since the target alpha is zero and the simulation will
      // stop naturally, but it’s a good practice.)
      // invalidation.then(() => simulation.stop())

      // Append the SVG element.
      document.getElementById('academia-container')?.append(svg.node()!)
    })
}
