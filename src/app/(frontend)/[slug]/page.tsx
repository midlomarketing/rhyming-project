import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const payload = await getPayload({ config })
  const { slug } = await paramsPromise

  const page = await queryPageBySlug({ slug: slug! })

  return (
    <main>
      <div>
        <h1>{page.title}</h1>
      </div>
      <div className={`flex justify-center`}>
        <RenderBlocks blocks={page.blocks} />
      </div>
    </main>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  return await payload
    .find({
      collection: 'pages',
      limit: 1,
      depth: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    .then((res) => res.docs[0] || null)
})
