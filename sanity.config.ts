import { defineConfig, isDev } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@schemas'

export default defineConfig({
  name: 'default',
  title: 'sanity',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  plugins: [deskTool(), ...(isDev ? [visionTool()] : [])],
  schema: {
    types: schemaTypes
  }
})
