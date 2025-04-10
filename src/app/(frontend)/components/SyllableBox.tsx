'use client'

import { ChevronDown } from 'lucide-react'
import { Vowel, Word } from '@/payload-types'
import React, { useState } from 'react'

type Props = {
  syllable: Vowel
  length: number
  index: number
  targetWord: Word
  children?: React.ReactNode
}

export const SyllableBox = ({ syllable, length, index, targetWord , children}: Props) => {

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div
      key={syllable.id}
      className={`p-4 border bg-violet-100
                     dark:bg-violet-600/50 text-violet-950 dark:text-violet-200 border-violet-400 rounded-md mb-4 shadow-sm`}
    >
      <div className={`flex flex-row justify-between border-b pb-1`} onClick={() => toggleItem(index)}>
        <h3>
          These words share a vowel{' '}
          {length < 2
            ? `with `
            : index + 1 === length
              ? `sound with the first syllable of `
              : index + 1 === 1
                ? `sound with the last syllable of `
                : `sound with syllable ${length - index}`}{' '}
          {targetWord.word.toLowerCase()}
        </h3>
        <ChevronDown className={`select-none transition-transform duration-300 ${openIndex === index ? '-rotate-180' : ''}`} />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
