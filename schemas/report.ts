import { defineType, defineField } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'
import { H1, H2 } from './RichTextComponents'

export default defineType({
  title: 'Reports',
  name: 'report',
  type: 'document',
  fields: [
    // Title
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Report title.'
    }),
    // Slug
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      },
      validation: (Rule) => Rule.required()
    }),
    // Thumbnail
    defineField({
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'image',
      description: 'Report thumbnail.'
    }),
    // Alt text
    defineField({
      title: 'Alt Text',
      name: 'alt_text',
      type: 'string',
      description: 'Thumbnail alt text.'
    }),
    // Description
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
      description: 'Report description.'
    }),
    // Read time
    defineField({
      title: 'Read time',
      name: 'read_time',
      type: 'number',
      description: 'Report reading time (in minutes).'
    }),
    // Date published
    defineField({
      title: 'Date published',
      name: 'date_published',
      type: 'date',
      description: 'The date this report was published/updated.',
      options: {
        dateFormat: 'MMMM D, YYYY'
      }
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1', component: H1 },
            { title: 'H2', value: 'h2', component: H2 },
            { title: 'Quote', value: 'blockquote' }
          ]
        }
      ]
    })
  ]
})

export type ReportType = {
  title: string
  slug: string
  image_url: string
  alt_text: string
  description: string
  read_time: number
  date_published: string
  content: PortableTextBlock[]
}
