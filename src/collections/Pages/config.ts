import {CollectionConfig} from 'payload'
import slugify from '@/utilities/slugify'


export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug']
  },
  fields: [
    {
      type: 'text',
      name: 'slug',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [slugify('title')]
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              type: 'text',
              name: 'title',
            }
          ]
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blockReferences: ['formBlock'],
              blocks: []
            }
          ]
        }
      ]
    }
  ]
}