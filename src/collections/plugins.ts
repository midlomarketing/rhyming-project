import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import type { Plugin } from 'payload'
import { beforeSyncWithSearch } from '@/collections/search/beforeSync'

export const plugins: Plugin[] = [
  formBuilderPlugin({
    fields: {
      text: true,
      textarea: true,
      select: false,
      email: true,
      state: false,
      country: false,
      checkbox: true,
      number: false,
      message: true,
      payment: false
    },
    formOverrides: {
      admin: {
        group: 'Forms'
      }
    },
    formSubmissionOverrides: {
      admin: {
        useAsTitle: 'title',
        group: 'Forms',
      },
      fields: ({defaultFields}) => [
        {
          type: 'text',
          name: 'title',
          hooks: {
            afterRead: [
              async ({data}) => {
              if (data) {
                return `Message from ${data.submissionData[0].value} at ${new Date(data.createdAt).toLocaleString("en-US")}`
              }
              }
            ]
          }
        },
        ...defaultFields,
      ]
    }
  }),
  seoPlugin({
    collections: ['word', 'pages'],
    tabbedUI: true,
    generateURL: ({ doc }) => `http://localhost:3000/word/` + doc.slug,
    generateTitle: ({ doc }) =>
      `Rhymes with ` + doc.word.toLowerCase() + " | Nick's Rhyming Dictionary",
    generateDescription: ({ doc }) =>
      `These are words that share vowel sounds with ${doc.word.toLowerCase()}`,
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'siteName',
        type: 'text',
        defaultValue: 'Rhymes Rhyming Dictionary',
      },
    ],
  }),
  searchPlugin({
    collections: ['word'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      hooks: {
        beforeChange: [
          async ({ data, req: { payload } }) => {
            const word = await payload.findByID({
              collection: 'word',
              id: data?.doc.value,
            })
            data.title = word.word
            data.slug = word.slug
          },
        ],
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          type: 'text',
          name: 'slug',
          index: true,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  }),
]
