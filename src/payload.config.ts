import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Words } from '@/collections/Words/config'
import { Vowels } from '@/collections/Vowels/config'
import { searchPlugin } from '@payloadcms/plugin-search'
import { beforeSyncWithSearch } from '@/collections/search/beforeSync'
import { seoPlugin } from '@payloadcms/plugin-seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      email: 'nick@midlowebdesign.com',
      password: 'test',
    },
    suppressHydrationWarning: true,
  },
  collections: [Users, Media, Words, Vowels],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['word'],
      tabbedUI: true,
      generateURL: ({doc}) => `http://localhost:3000/word/` + doc.slug,
      generateTitle: ({doc}) => `Rhymes with ` + doc.word.toLowerCase() + ' | Nick\'s Rhyming Dictionary',
      generateDescription: ({doc}) => `These are words that share vowel sounds with ${doc.word.toLowerCase()}`,
      fields: ({defaultFields}) =>  [
        ...defaultFields,
        {
          name: 'siteName',
          type: 'text',
          defaultValue: 'Rhymes Rhyming Dictionary',
        }
      ]
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
            }
          }
        ],
      },
    }),
  ],
})
