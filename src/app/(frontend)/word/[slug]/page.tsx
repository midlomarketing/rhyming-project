import {getPayload} from 'payload'
import configPromise from '@payload-config'
import type {Vowel} from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
  }>,
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default async function Word({ params: paramsPromise, searchParams }: Args){
  const {slug} = await paramsPromise
  const search = await searchParams

  const payload = await getPayload({config: configPromise})

  const { word, id, pronunciations, homonyms } = await payload
    .find({
      collection: 'word',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    .then((res) => res.docs[0])

  const lastVowel = pronunciations[pronunciations.length - 1].lastVowel

  const rhymes = await payload.find({
    collection: 'word',
    where: {
      word: {
        not_equals: word,
      },
      'pronunciations.lastVowel': {
        equals: lastVowel
      },
    }
  })
  
  return (
    <main>
      <div className={`m-4`}>
        <div className={`p-4`}>
          <h1>Rhymes for: <span className={`bg-gradient-to-br from-violet-950 to-violet-400 bg-clip-text text-transparent font-extrabold leading-normal`}>{word}</span></h1>
          <div>
            <div className={`flex flex-wrap mt-4`}>
                {rhymes.docs.map(({ word, slug }) => (
                  <a className={`border border-violet-400 text-violet-400 px-4 py-2 m-0 rounded-2xl hover:text-violet-50 hover:bg-violet-400 transition duration-200 hover:transition hover:duration-200`} key={word} href={`/word/${slug}`}>{word}</a>
                ))}
            </div>
          </div>
          <div>
            {pronunciations.length > 1 && (
              <div>
                <h2>Pronunciations</h2>
                {pronunciations.map(({ lastVowel, syllables }, i, arr) => (
                  <div key={i}>
                    {syllables.map(({ vowelSounds }, j, arr) => (
                      <div key={j}>{typeof vowelSounds !== 'string' && vowelSounds?.value}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}