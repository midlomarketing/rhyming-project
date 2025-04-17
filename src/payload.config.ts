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
import { plugins } from '@/collections/plugins'
import { Pages } from '@/collections/Pages/config'
import { FormBlock } from '@/blocks/Form/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    avatar: 'default',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      email: 'nick@midlowebdesign.com',
      password: 'test',
    },
    suppressHydrationWarning: true,
  },
  collections: [Users, Media, Words, Vowels, Pages],
  blocks: [FormBlock],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins,
})
