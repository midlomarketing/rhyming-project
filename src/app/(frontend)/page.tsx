'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


export default function Page() {

  const [searchWord, setSearchWord] = useState('')
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchWord(event.target.value.toLowerCase())
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/word/${searchWord}`)
    }
  }

  return (
    <main className={`h-[calc(100vh-16rem)] dark:text-violet-50 text-violet-950`}>
      <div className={`flex gap-4 flex-col min-h-full justify-center items-center`}>
        <h1 className={`text-violet-950 dark:text-violet-50`}>Search</h1>
        <div className="flex flex-col">
          <label className={`mb-2 visually-hidden`} htmlFor="search">
            Search
          </label>
          <div className="flex items-center gap-2">
            <input
              autoComplete={'off'}
              autoFocus
              onChange={handleChange}
              onKeyDown={handleEnter}
              className={`border border-purple-950 px-2 py-1 rounded-md dark:border-violet-50 dark:placeholder:text-violet-50/50`}
              type={'text'}
              name={'search'}
              placeholder={'Search...'}
            />
            <Link
              aria-disabled={!searchWord}
              className={`aria-disabled:bg-violet-950/30 aria-disabled:dark:bg-violet-50/30 aria-disabled:cursor-not-allowed cursor-pointer aria-disabled:pointer-events-none dark:bg-violet-50 dark:text-violet-950 bg-violet-950 text-violet-50 px-2 py-1 rounded-md`}
              role={'button'}
              href={`/search/${searchWord.toLowerCase()}`}
            >
              SEARCH
            </Link>
          </div>
        </div>
          {searchWord && <div>Search for words that share vowel sounds with <span
                  className={`dark:bg-gradient-to-tr dark:from-violet-500 dark:to-violet-200
                  bg-gradient-to-br from-violet-950 to-violet-400 bg-clip-text text-transparent font-extrabold leading-normal`}
                >{searchWord.toLowerCase()}</span></div>}
      </div>
    </main>
  )
}