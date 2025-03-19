import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Vowel, Word } from '@/payload-types'
import Link from 'next/link'

export const WordCell = async ({ word, vowelSound, syllable, className }: { word: Word; vowelSound: Vowel, syllable: number, className?: string }) => {
  const { slug } = word

  const payload = await getPayload({ config: configPromise })

  const getNewWord = await payload
    .find({
      collection: 'word',
      where: {
        'pronunciations.lastVowel': {
          equals: vowelSound.value,
        },
        slug: {
          not_equals: slug,
        },
      },
    })
    .then((res) => res.docs)

  return getNewWord.map((word, i, arr) => (
    <tr key={i} className={`border border-violet-950 text-center even:bg-purple-50`}>
      <td className={`p-2`}>
        <Link className={`border border-violet-950 text-violet-950 px-4 py-1 m-0 rounded-full hover:text-violet-50 hover:bg-violet-950 transition duration-200 hover:transition hover:duration-200`} href={`/word/${word.slug}`}>{word.word}</Link>
      </td>
      <td>{syllable}</td>
      <td>

      </td>
    </tr>
  ))
}
