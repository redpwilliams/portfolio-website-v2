// TODO - Rename to blog
import { defineType, defineField, defineArrayMember } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'
import { MainHeading, SubHeading, Gist } from './RichTextComponents'

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
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
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
      // https://www.sanity.io/docs/customizing-the-portable-text-editor#14d3f8b767ae
      // @ts-expect-error Works but Sanity's type definition does not
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Main Heading', value: 'h1', component: MainHeading },
            { title: 'Sub Heading', value: 'h2', component: SubHeading },
            { title: 'Gist', value: 'code', component: Gist },
            { title: 'Quote', value: 'blockquote' }
          ]
        })
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
