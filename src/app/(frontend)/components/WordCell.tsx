import { getPayload } from 'payload'
import config from '@payload-config'
import type { Vowel, Word } from '@/payload-types'
import Link from 'next/link'
import { Motion } from '@/components/Motion'
import { Star } from 'lucide-react'
import { addFavorite } from '@/app/(frontend)/word/actions/addFavorite'
import {AddFavorite} from '@/app/(frontend)/word/actions/components/AddFavorite'
import { RemoveFavorite } from '@/app/(frontend)/word/actions/components/RemoveFavorite'

export const WordCell = async ({
  vowelSound,
  targetWord,
  syllable,
  favorites
}: {
  vowelSound: string
  targetWord: Word
  syllable: Vowel
  favorites?: string[]
}) => {
  const payload = await getPayload({ config })
  const homonyms = targetWord.homonyms?.map((word) => typeof word !== 'string' && word.word)

  const rhyme = await payload
    .find({
      collection: 'word',
      where: {
        word: {
          not_equals: targetWord.word,
          not_in: homonyms,
        },
        or: [
          {
            'pronunciations.lastVowel': {
              equals: vowelSound,
            },
          },
          {
            'pronunciations.syllables.vowelSounds': {
              contains: syllable,
            },
          },
        ],
      },
      limit: 0,
    })
    .then((res) => res.docs)

  return rhyme.length > 0 ? (
    <div className={`flex flex-wrap my-4 gap-2 justify-start text-violet-950 dark:text-violet-200`}>
      {rhyme.map(({ word, slug, id }, index) => (
        <Motion className={`chips flex gap-4 items-center`} index={index} key={id}>
          <Link href={`/word/${slug}`}>{word}</Link>
          {!favorites?.includes(word) ? <AddFavorite favorites={favorites} word={word} /> : <RemoveFavorite word={word} favorites={favorites} /> }
        </Motion>
      ))}
    </div>
  ) : (
    <p className={`text-md py-0 my-2`}>No words found</p>
  )
}
