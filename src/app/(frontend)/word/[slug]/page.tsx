import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Vowel } from '@/payload-types'
import { WordCell } from '@/app/(frontend)/components/WordCell'

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default async function Word({ params: paramsPromise, searchParams }: Args) {
  const { slug } = await paramsPromise
  const search = await searchParams


  const payload = await getPayload({ config: configPromise })

  const word = await payload
    .find({
      collection: 'word',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    .then((res) => res.docs[0])

  const lastVowel = word.pronunciations[word.pronunciations.length - 1].lastVowel

  const rhymes = await payload.find({
    collection: 'word',
    where: {
      word: {
        not_equals: word.word,
      },
      'pronunciations.lastVowel': {
        equals: lastVowel,
      },
    },
    limit: 3,
    page: Number(search.p) || 1
  })

  return (
    <main>
      <div className={`m-4`}>
        <div className={`p-4`}>
          <h1>
            Rhymes for:{' '}
            <span
              className={`bg-gradient-to-br from-violet-950 to-violet-400 bg-clip-text text-transparent font-extrabold leading-normal`}
            >
              {word.word}
            </span>
          </h1>
          <div>
            <div className={`flex flex-wrap mt-4 gap-1`}>
              {rhymes.docs.map(({ word, slug }) => (
                <a
                  className={`border border-violet-950 text-violet-950 px-4 py-1 m-0 rounded-full hover:text-violet-50 hover:bg-violet-950 transition duration-200 hover:transition hover:duration-200`}
                  key={word}
                  href={`/word/${slug}`}
                >
                  {word}
                </a>
              ))}
            </div>
          </div>
          <div>
            {word.pronunciations.length > 1 && (
              <div>
                <h2>Pronunciations</h2>
                {word.pronunciations.map(({ lastVowel, syllables }, i, arr) => (
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
