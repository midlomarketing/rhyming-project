import React from 'react'
import './styles.css'

// TODO Handle pronunciation groups, syllable groups, and pagination
// TODO handle when word isn't found: definition for word, and add word? form
// TODO add filters and pagination on our pages
// TODO replace metadata
// TODO add plugins: SEO, Redirects, Search
// TODO add auth, for customers and for admin



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
