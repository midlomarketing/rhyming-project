import Link from 'next/link'
import { Search } from 'lucide-react'

export const NavBar = () => {

  return (
    <nav
      className={`flex flex-col justify-between px-4 py-2 border-b border-b-violet-950 dark:border-b-violet-500 sticky z-50 top-0 backdrop-blur-md bg-violet-100/60 dark:bg-violet-800/60`}
    >
      <div className={`flex justify-end gap-2 pb-2 border-b border-b-violet-950/30 dark:border-b-violet-500`}>
        <Link className={`px-1 rounded-md bg-violet-950 text-violet-50 dark:text-violet-950 dark:bg-violet-50`} href={'/login'}>
          Login
        </Link>
        <Link
          className={`px-1 rounded-md text-violet-950 dark:text-violet-50 border border-violet-950 dark:border-violet-50`}
          href={'/sign-up'}
        >
          Sign Up
        </Link>
      </div>
      <div className={`flex items-center justify-between gap-4 pt-2`}>
        <Link className={`dark:text-violet-50`} href={`/`}>Logo</Link>
        <div className={`flex items-center gap-4`}>
          <Link className={`px-2 py-1 rounded-md bg-amber-700 text-violet-50`} href={'/'}>
            Home
          </Link>
          <Link className={`px-2 py-1 rounded-md bg-amber-700 text-violet-50`} href={'/contact'}>
            Contact
          </Link>
          <Link className={`px-2 py-1`} href={'/search'}>
            <Search className={`stroke-violet-950 dark:stroke-violet-200`} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
