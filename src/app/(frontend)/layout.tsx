import React from 'react'
import './styles.css'

// TODO add a few words of varying length and pronunciations
// TODO add those words to the front end
// TODO determine layout of the front end - table, or flex chips
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
