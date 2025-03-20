import type { CollectionConfig } from 'payload'

export const Vowels: CollectionConfig = {
  slug: 'vowel',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      required: true,
      name: 'label',
    },
    {
      type: 'text',
      required: true,
      name: 'value',
    },
    {
      type: 'text',
      name: 'title',
      hooks: {
        beforeChange: [
          async ({siblingData}) => {
          return siblingData.label + ' ' + siblingData.value
          }
        ]
      }
    },
    {
      name: 'update',
      type: 'checkbox',
    }
  ],
}
