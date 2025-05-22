import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { SyllableBox } from '@/app/(frontend)/components/SyllableBox'
import { Vowel } from '@/payload-types'
import { WordCell } from '@/app/(frontend)/components/WordCell'
import React, { cache } from 'react'
import { PronunciationBox } from '@/app/(frontend)/components/PronunciationBox'
import { Metadata } from 'next'
import { meta } from '@/app/(frontend)/components/Metadata'
import { RequestForm } from '@/components/RequestForm/Component'
import { toast } from 'sonner'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Word({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise

  const targetWord = await queryWordBySlug({ slug: slug || `` })

  const definitions = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${slug}`).then(
    (res) => res.json(),
  )

  return (
    <main className={`text-violet-950 dark:text-violet-50`}>
      <div className={`m-4`}>
        <div className={`p-4`}>
          {targetWord ? (
            <>
              <h1 className={`dark:text-violet-200`}>
                Words that share vowel sounds with{' '}
                <span
                  className={`
                  bg-gradient-to-br from-violet-950 to-violet-400
                  dark:bg-gradient-to-tr dark:from-violet-500 dark:to-violet-200 
                  bg-clip-text text-transparent font-extrabold leading-normal
                  `}
                >
                  {targetWord.word}
                </span>
              </h1>
              <div>
                <div className={`mt-8`}>
                  {targetWord.pronunciations.map(({ syllables }, index, arr) => (
                    <PronunciationBox
                      key={index}
                      index={index}
                      length={arr.length}
                      targetWord={targetWord}
                    >
                      {syllables.reverse().map((syllable, j, arr) => (
                        <SyllableBox
                          syllable={syllable as Vowel}
                          key={syllable.id}
                          length={arr.length}
                          targetWord={targetWord}
                          index={j}
                        >
                          <div>
                            {syllable?.vowelSounds && typeof syllable.vowelSounds !== 'string' && (
                              <WordCell
                                syllable={syllable.vowelSounds}
                                targetWord={targetWord}
                                vowelSound={syllable.vowelSounds.value}
                              />
                            )}
                          </div>
                        </SyllableBox>
                      ))}
                    </PronunciationBox>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>
                No matches were found for {''}
                <span
                  className={`
                  bg-gradient-to-br from-violet-950 to-violet-400
                  dark:bg-gradient-to-tr dark:from-violet-500 dark:to-violet-200 
                  bg-clip-text text-transparent font-extrabold leading-normal
                  `}
                >
                  {slug}
                </span>
              </h1>
              <p>If you think we should have this word. Contact us.</p>
              <RequestForm defaultValue={slug} />
            </>
          )}
          {definitions.length > 0 && (
            <div className={`mt-8`}>
              <h2>
                Definitions for{' '}
                <span
                  className={`
                  bg-gradient-to-br from-violet-950 to-violet-400
                  dark:bg-gradient-to-tr dark:from-violet-500 dark:to-violet-200 
                  bg-clip-text text-transparent font-extrabold leading-normal
                  `}
                >
                  {targetWord?.word || slug}
                </span>
              </h2>
              <div>
                {definitions.map(
                  (
                    { meanings }: { meanings: { definitions: { definition: string }[] }[] },
                    index: number,
                  ) => (
                    <div
                      key={index}
                      className={`p-4 border bg-violet-100/60 dark:bg-violet-500/30 rounded-md my-4 shadow`}
                    >
                      <h3>Definition {index + 1}: </h3>
                      {meanings[0].definitions[0].definition}
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
          {definitions[0].meanings[0].synonyms.length > 0 && (
            <div className={`mt-8`}>
              <h2>
                Synonyms for{' '}
                <span
                  className={`
                  bg-gradient-to-br from-violet-950 to-violet-400
                  dark:bg-gradient-to-tr dark:from-violet-500 dark:to-violet-200 
                  bg-clip-text text-transparent font-extrabold leading-normal
                  `}
                >
                  {targetWord?.word || slug}
                </span>
              </h2>
              <div className={`flex flex-wrap my-4 gap-2 justify-start`}>
                {definitions[0].meanings[0].synonyms.map((synonym: string, index: number) => (
                  <Link className={`chips`} href={`/word/${synonym.toLowerCase()}`} key={index}>
                    {synonym}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({ params: paramPromise }: Args): Promise<Metadata> {
  const slug = (await paramPromise).slug

  const word = await queryWordBySlug({ slug: slug || `` })

  if (word) {
    return meta({ doc: word })
  } else {
    return {
      title: `Rhymes for ${slug} | Rhymes Rhyming Dictionary`,
      description: `These words share a vowel sound with ${slug}`,
    }
  }
}

const queryWordBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  return await payload
    .find({
      collection: 'word',
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
