/**
 * Retrieves the gradient style defined in the root CSS variable '--gradient',
 * extracts its components, and returns an array containing the start color and end color.
 *
 * @returns {string[]} An array containing the start color and end color of the gradient.
 * @example
 * const gradientColors = getGradient();
 * // Returns ["rgba(255, 133, 64, 1)", "rgba(255, 64, 64, 1)"]
 * @description This ommits the angle because that is less likely to change throughut
 * the implementation of this website.
 */
export function getGradient() {
  // Get gradient style from root
  let gradient = getComputedStyle(document.documentElement).getPropertyValue('--gradient')

  // Extract components of gradient
  gradient = gradient.substring(gradient.indexOf('(') + 1, gradient.length - 1)
  // Ex: "45deg, rgba(255, 133, 64, 1), rgba(255, 64, 64, 1)"

  const components = gradient.split(',').map((prop) => prop.trim())
  const startColor = components.slice(1, 5).join(', ')
  const endColor = components.slice(5).join(', ')
  return [startColor, endColor]
}

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
