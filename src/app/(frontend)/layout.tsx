import React from 'react'
import './styles.css'
import { NavBar } from './components/Nav/NavBar'

// TODO add auth, for customers and for admin
//// TODO add a way to add favorite words to account

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
    </html>
  )
}
