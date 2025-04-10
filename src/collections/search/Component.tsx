'use client'
import React, {useState, useEffect} from 'react'
import {useDebounce} from '@/utilities/useDebounce'
import {useRouter} from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className={`mb-8 flex flex-col w-full justify-center items-start`}>
      <label htmlFor="search" className="hidden">
        Search
      </label>
      <input
        id="search"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value)
        }}
        placeholder="Search"
        className={`border border-b-violet-950 rounded-md p-2`}
      />
      <button type="submit" className={`p-2 mt-4 w-full bg-violet-950 text-violet-50 font-bold rounded-md`}>
        search
      </button>
    </form>
  )
}
