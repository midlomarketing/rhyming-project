'use client'

import { SquareChevronDown } from 'lucide-react'
import { Word } from '@/payload-types'
import React, { useRef, useState } from 'react'

type Props = {
  index: number
  length: number
  children: React.ReactNode
  targetWord: Word
}

export const PronunciationBox = ({ index, length, children, targetWord }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div
      key={index}
      className={length > 1 ? `px-4 border-violet-950 dark:border-violet-50 border rounded-md mb-4 shadow` : ``}
    >
      {targetWord.pronunciations.length > 1 && (
        <div className={`pt-2`}>
          <div
            className={`flex flex-wrap items-center justify-between mb-4 mt-2 text-2xl text-violet-950 dark:text-violet-200`}
            onClick={() => toggleItem(index)}
          >
            <h2>Pronunciation {index + 1}</h2>
            <SquareChevronDown
              className={`transition-transform duration-300 ${openIndex === index ? '-rotate-180' : ''}`}
            />
          </div>
        </div>
      )}
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
