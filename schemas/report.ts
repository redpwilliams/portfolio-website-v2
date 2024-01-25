import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Reports',
  name: 'report',
  type: 'document',
  fields: [
    // Thumbnail
    defineField({
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'image',
      description: 'Report thumbnail.'
    }),
    // Title
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Report title.'
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
          type: 'block'
        }
      ]
    })
  ]
})

export type TReport = {
  image_url: string
  title: string
  description: string
  read_time: number
  date_published: string
}
