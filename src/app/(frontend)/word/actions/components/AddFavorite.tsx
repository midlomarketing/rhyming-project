'use client'

import { addFavorite } from '@/app/(frontend)/word/actions/addFavorite'
import { Star } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useFormStatus } from 'react-dom'

export const AddFavorite = ({ word }: { word: string }) => {

  const inititalState = {
    error: null,
    success: false,
  }

  const [state, formAction, pending] = useActionState(addFavorite, inititalState)

  useEffect(() => {
    if (state.error) {
      toast.error(`${state.error}`)
    } else if (state.success) {
      toast.success('Successfully added to favorites.')
    }
  }, [state.error, state.success])

  return (
    <form action={formAction} className={'flex items-center'}>
      <button type={'submit'}>
      <Star
        className={`h-5 w-5 stroke-amber-700`}
      /></button>
      <input type="hidden" name="word" value={word} />
    </form>
  )
}
