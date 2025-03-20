import React from 'react'
import './styles.css'

// TODO how to add a column representing another pronunciation?
// TODO sort by which syllable it rhymes on
// TODO clear type errors
// TODO handle when word isn't found: definition for word, and add word? form
//// TODO use https://dictionaryapi.dev for definitions
// TODO Exclude homonymous words
// TODO add thesaurus section using datamuse
// TODO add auth, for customers and for admin
// TODO replace metadata
// TODO add plugins: SEO, Search




export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
