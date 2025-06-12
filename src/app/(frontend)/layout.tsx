import React from 'react'
import './styles.css'
import { NavBar } from './components/Nav/NavBar'
import { Toaster } from 'sonner'

// TODO move user checks to page.tsx
//// TODO check that user login/out is working after pnpm build
// TODO fix dark mode styles

// TODO try modals
//// TODO try creating an intercepting route for /search
//// TODO try creating an intercepting route for /login

export const metadata = {
  description: 'Rhymes Rhyming Dictionary of Rhymes. Find interesting rhymes here.',
  title: 'Rhymes Rhyming Dictionary',
}

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const { children, modal } = props

  return (
    <html lang="en" className={`dark:bg-violet-950 bg-violet-50/50`}>
      <body>
        <NavBar />
        <main>{children}</main>
        {modal}
      </body>
      <Toaster richColors={true} />
    </html>
  )
}
