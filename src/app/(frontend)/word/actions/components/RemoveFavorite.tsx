'use client'

import { Star } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { removeFavorite } from '@/app/(frontend)/word/actions/removeFavorite'
import { Word } from '@/payload-types'

export const RemoveFavorite = ({ word }: { word: string }) => {

  const inititalState = {
    error: null,
    success: false,
  }

  const [state, formAction, pending] = useActionState(removeFavorite, inititalState)

  useEffect(() => {
    if (state.error) {
      toast.error(`${state.error}`)
    } else if (state.success) {
      toast.success('Successfully removed from favorites.')
    }
  }, [state.error, state.success])

  return (
    <form action={formAction} className={'flex items-center'}>
      <button type={'submit'}>
      <Star
        className={`h-5 w-5 fill-amber-700 stroke-none cursor-pointer`}
      /></button>
      <input type="hidden" name="word" value={word} />
    </form>
  )
}
