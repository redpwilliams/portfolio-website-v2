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
