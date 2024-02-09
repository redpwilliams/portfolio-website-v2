import { buildLegacyTheme } from 'sanity'

const props = {
  '--v2-white': '#fff',
  '--v2-black': '#1e1e1e',
  '--v2-gray': '#606060',
  '--v2-blue': '#4285f4',
  '--v2-red': '#db4437',
  '--v2-yellow': '#f4b400',
  '--v2-green': '#0f9d58'
}

export const sanityTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--v2-black'],
  '--white': props['--v2-white'],

  '--gray': props['--v2-gray'],
  '--gray-base': props['--v2-gray'],

  '--component-bg': props['--v2-black'],
  '--component-text-color': props['--v2-white'],

  /* Brand */
  '--brand-primary': props['--v2-blue'],

  // Default button
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--v2-blue'],
  '--default-button-success-color': props['--v2-green'],
  '--default-button-warning-color': props['--v2-yellow'],
  '--default-button-danger-color': props['--v2-red'],

  /* State */
  '--state-info-color': props['--v2-blue'],
  '--state-success-color': props['--v2-green'],
  '--state-warning-color': props['--v2-yellow'],
  '--state-danger-color': props['--v2-red'],

  /* Navbar */
  '--main-navigation-color': props['--v2-black'],
  '--main-navigation-color--inverted': props['--v2-white'],

  '--focus-color': props['--v2-blue']
})
