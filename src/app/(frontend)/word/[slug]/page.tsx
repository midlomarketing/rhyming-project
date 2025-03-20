import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { MoveLeft, MoveRight } from 'lucide-react'

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

  const page = Number(search.p) || 1

  const payload = await getPayload({ config: configPromise })

  const targetWord = await payload
    .find({
      collection: 'word',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    .then((res) => res.docs[0])

  const lastVowel = targetWord.pronunciations[targetWord.pronunciations.length - 1].lastVowel

  const vowelArray = targetWord.pronunciations
    .map((p) => p.syllables.map((s) => typeof s.vowelSounds !== 'string' && s.vowelSounds?.value))
    .reduce((s) => s)

  let syllableLookup = {}

  vowelArray.map((vowel, i) => (syllableLookup[vowel] = i))

  const rhymes = await payload.find({
    collection: 'word',
    where: {
      word: {
        not_equals: targetWord.word,
      },
      'pronunciations.lastVowel': {
        in: vowelArray,
      },
    },
    limit: 3,
    page: Number(search.p) || 1,
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
              {targetWord.word}
            </span>
          </h1>
          {targetWord.pronunciations.length > 1 && (
            <p>{targetWord.word} has more than one pronunciation reflected below.</p>
          )}
          <div>
            <div className={`flex flex-wrap mt-4 gap-1 justify-center`}>
              {/*{rhymes.docs.map((word) => (*/}
              {/*  <Link*/}
              {/*    className={`border border-violet-950 text-violet-950 px-4 py-1 m-0 rounded-full hover:text-violet-50 hover:bg-violet-950 transition duration-200 hover:transition hover:duration-200`}*/}
              {/*    key={word.word}*/}
              {/*    href={`/word/${word.slug}`}*/}
              {/*  >*/}
              {/*    {word.word}{' '}*/}
              {/*    {syllableLookup[word.pronunciations.map((p) => p.lastVowel).join(', ')] + 1}*/}
              {/*  </Link>*/}
              {/*))}*/}
              <table>
                <thead>
                  <tr>
                    <th className={'p-2'}>Word</th>
                    <th className={'p-2'}>Rhymes on Syllable</th>
                    {/*<th className={'p-2'}>Alternate Pronunciation</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {rhymes.docs.map((word) => (
                    <tr
                      key={word.id}
                      className={`border border-violet-950 text-center even:bg-purple-50`}
                    >
                      <td className={`p-2`}>
                        <Link
                          className={`border border-violet-950 text-violet-950 px-4 py-1 m-0 rounded-full hover:text-violet-50 hover:bg-violet-950 transition duration-200 hover:transition hover:duration-200`}
                          key={word.word}
                          href={`/word/${word.slug}`}
                        >
                          {word.word}
                        </Link>
                      </td>
                      <td className={`p-2`}>
                        {syllableLookup[word.pronunciations.map((p) => p.lastVowel).join(', ')] + 1}
                      </td>
                      {/*<td>{targetWord.pronunciations.length > 1 ? 'Y' : 'N'}</td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rhymes.totalPages > 1 &&
              <div className={`flex flex-wrap justify-center items-center gap-4 mt-4 w-full text-violet-950`}>
                <Link
                  className={page - 1 < 1 ? 'pointer-events-none text-violet-950/30' : ''}
                  href={`/word/${targetWord.slug}?p=${page - 1}`}
                >
                  <MoveLeft height={30} width={30} />
                </Link>

                <p>Page {page} of {rhymes.totalPages}</p>

                <Link
                  className={
                    page + 1 > rhymes.totalPages ? 'pointer-events-none text-violet-950/30' : ''
                  }
                  href={`/word/${targetWord.slug}?p=${page + 1}`}
                >
                  <MoveRight height={30} width={30} />
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </main>
  )
}
