import { getPayload } from 'payload'
import config from '@payload-config'
import type { Word } from '@/payload-types'
import Link from 'next/link'

export const WordCell = async ({
  vowelSound,
  targetWord,
}: {
  vowelSound: string
  targetWord: Word
}) => {
  const payload = await getPayload({ config })
  const homonyms = targetWord.homonyms?.map(( word ) => typeof word !== 'string' && word.word)

  const rhyme = await payload
    .find({
      collection: 'word',
      where: {
        word: {
          not_equals: targetWord.word,
          not_in: homonyms
        },
        'pronunciations.lastVowel': {
          equals: vowelSound,
        },
      },
      limit: 0,
    })
    .then((res) => res.docs)

  return (
    rhyme.length > 0 ? <div className={`flex flex-wrap my-4 gap-2 justify-start text-violet-950 dark:text-violet-200`}>
      {rhyme.map(({ word, slug, id }) => (
        <Link
          className={`chips`}
          href={`/word/${slug}`}
          key={id}
        >
          {word}
        </Link>
      ))}
    </div> : <p className={`text-md py-0 my-2`}>No words found</p>
  )
}
