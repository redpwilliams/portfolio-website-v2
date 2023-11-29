import { defineType, defineField } from 'sanity'

/**
 * Things to consider adding:
 * - Description (might go better with the blog part, maybe not),
 * - Technologies used (array),
 * - Date created, and/or date last updated
 * - Tags/Categories
 * - License
 * - Status (ongoing, completed, or in a specific development phase)
 * - Download link
 */

export default defineType({
  title: 'Projects',
  name: 'project',
  type: 'document',
  fields: [
    // Title
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Project title.'
    }),
    // Image
    defineField({
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'image',
      description: 'Image for the project.'
    }),
    // Links
    defineField({
      title: 'Links',
      name: 'link',
      type: 'object',
      description: 'Github and Project links.',
      fields: [
        // Github
        defineField({
          title: 'Github',
          name: 'github',
          type: 'url',
          description: 'Github link to the project.'
        }),
        // Project
        defineField({
          title: 'Project',
          name: 'project_url',
          type: 'url',
          description: 'Any other link relevant to the project.'
        }),
        // Documentation
        defineField({
          title: 'Documentation',
          name: 'documentation',
          type: 'url',
          description: 'Documentation link.'
        })
      ]
    }),
    // Featured
    defineField({
      title: 'Featured',
      name: 'featured',
      type: 'boolean',
      description: 'Indicates whether this project is shown on the Featured section.'
    })
  ]
})
