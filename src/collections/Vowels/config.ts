import type { CollectionConfig } from 'payload'

export const Vowels: CollectionConfig = {
  slug: 'vowel',
  admin: {
    useAsTitle: 'label',
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
  ],
}
