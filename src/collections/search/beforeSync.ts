import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, word, title, meta } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    title,
    // meta: {
    //   ...meta,
    //   title: meta?.title || title,
    //   image: meta?.image?.id || meta?.image,
    //   description: meta?.description,
    // },
    word,
    id
  }

  return modifiedDoc
}