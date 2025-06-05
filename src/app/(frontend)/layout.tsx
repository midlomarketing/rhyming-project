import React from 'react'
import './styles.css'
import { NavBar } from './components/Nav/NavBar'
import { Toaster } from 'sonner'

// TODO I think favorites needs to be a relationship field with hasMany which can be added or removed by id; this will allow me to add a table to the user's dashboard and link to the favorite words without extra queries
// TODO add auth, for customers and for admin
// TODO move user checks to page.tsx
//// TODO check that user login/out is working after pnpm build

export const metadata = {
  description: 'Rhymes Rhyming Dictionary of Rhymes. Find interesting rhymes here.',
  title: 'Rhymes Rhyming Dictionary',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`dark:bg-violet-950 bg-violet-50/50`}>
      <body>
      <NavBar />
        <main>{children}</main>
      </body>
    <Toaster richColors={true} />
    </html>
  )
}
