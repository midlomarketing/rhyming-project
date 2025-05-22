import type {Metadata} from 'next/types'
import configPromise from '@payload-config'
import {getPayload} from 'payload'
import React, {Fragment} from 'react'
import {Search} from '@/collections/search/Component'
import Link from "next/link";
import { Word } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    q: string
    p: string
  }>
}
export default async function Page({searchParams: searchParamsPromise}: Args) {
  const {q: query, p: page} = await searchParamsPromise
  const payload = await getPayload({config: configPromise})

  const words = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 20,
    select: {
      title: true,
      slug: true,
      // meta: true,
      updatedAt: true,
      createdAt: true,
      doc: true
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
        where: {
          or: [
            {
              'doc.relationTo': {
                like: query
              }
            },
            {
              title: {
                like: query,
              },
            },
            // {
            //   'meta.description': {
            //     like: query,
            //   },
            // },
            // {
            //   'meta.title': {
            //     like: query,
            //   },
            // },
            {
              slug: {
                like: query,
              },
            },
          ],
        },
      }
      : {}),
  })

  // console.log(posts)

  return (
    <main className={`h-[calc(100vh-16rem)] ps-8 mt-4`}>
      <div className={`flex gap-4 flex-col min-h-full justify-center items-center`}>
        <div>
          <div>
            <div>
              <Search />
            </div>
          </div>
        </div>

        {words?.docs && words.totalDocs > 0 ? (
          <div className={`flex flex-wrap gap-4 text-violet-950 justify-center`}>
            {words.docs.map((word) => (
              <Fragment key={word.id}>
                <Link
                  className={`flex-1/8 grow-0 shrink w-auto text-center border border-violet-950 rounded-full px-2 py-0`}
                  href={`/word/${word.slug}`}>
                  <p>{word.title}</p>
                </Link>
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="container">No results found.</div>
        )}
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search rhymes | Rhymes Rhyming Dictionary`,
    description: `Search for all words that currently exist in our database.`,
  }
}
