export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'projectTitle',
      title: 'Project Title',
      type: 'string'
    },
    {
      name: 'links',
      title: 'Links',
      type: 'string'
    }
  ]
}

type Links = {
  github: string
  project?: string
}
