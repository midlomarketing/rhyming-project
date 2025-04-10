import { Word } from '@/payload-types'
import { Metadata } from 'next'

export const meta = async (args: { doc: Word }): Promise<Metadata> => {

  const { doc } = args || {}
  const meta = doc?.meta

  return {
    title: meta?.title || 'MidloMark Boilerplate',
    description: meta?.description || '',
    metadataBase: new URL(`http://localhost:3000`),
    openGraph: {
      title: meta?.title || 'Rhyme',
      description: meta?.description || '',
      url: `/word/${doc.slug ? doc.slug : ''}`,
      siteName: meta?.siteName || 'Rhymes Rhyming Dictionary',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: meta?.title || 'Rhymes Rhyming Dictionary',
      description: meta?.description || ``,
    },
  }
}
