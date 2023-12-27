import { defineType, defineField, defineArrayMember } from 'sanity'

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

//NOTE - It might be worthwhile to export an interface for the types defined here

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
      description: 'Project thumbnail.'
    }),
    // Description
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
      description: 'Project description.'
    }),
    // Links
    defineField({
      title: 'Links',
      name: 'links',
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
        })
      ]
    }),
    // Technology list
    defineField({
      title: 'Technology List',
      name: 'technologies',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Tech',
          name: 'tech',
          type: 'string'
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

export type TProject = {
  title: string
  image_url: string
  description: string
  links: {
    github: string
    project_url?: string
  }
  technologies: string[]
  featured: boolean
}
