'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { requestWord } from '@/components/RequestForm/actions/requestWord'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  defaultValue?: string
}

export const RequestForm = (props: Props) => {
  const [value, setValue] = useState('')
  const { defaultValue } = props

  const initialState = {
    message: '',
    submitted: false,
    status: {
      error: '',
      success: undefined,
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.target.value.toLowerCase())
  }

  const [state, formAction, pending] = useActionState(requestWord, initialState)

  useEffect(() => {
    if (state.status.success) {
      toast.success(state.status.success)
    } else if (state.status.error && typeof state.message !== 'string') {
      toast.error(state.message?.email || state.message?.word)
    }
  }, [state?.submitted, state.status])

  return !state.submitted ? (
    <form
      action={formAction}
      id={`request-word-form`}
      className={`my-8 p-4 border border-violet-950 rounded-md bg-violet-200 xl:w-1/2`}
    >
      <h2 className={`font-bold mb-2 text-center lg:text-start block`}>Request a Word</h2>
      <div className={`grid grid-cols-12 
      md:gap-2 gap-4 my-4
      `}>
        <div className={`col-span-12 sm:col-span-6`}><label className={`sr-only`} htmlFor={'word-request'}>
          Word
        </label>
          <input
            onChange={handleChange}
            className={`border border-violet-950 bg-white px-2 py-2 rounded-md w-full h-auto`}
            id={'word-request'}
            name={'word-request'}
            type={'text'}
            placeholder={'Enter a word'}
            required={true}
            defaultValue={defaultValue || ''}
          />
          <div className={`text-red-600 mt-2`}>{typeof state.message !== 'string' && state.message?.word && state.message?.word}</div>
        </div>
        <div className={`col-span-12 sm:col-span-6`}><label className={`sr-only`} htmlFor={'email'}>
          Email
        </label>
          <input
            className={`border border-violet-950 bg-white px-2 py-2 rounded-md w-full`}
            id={'request-form'}
            type={'email'}
            name={'email'}
            placeholder={'Enter your email'}
            required={true}
          />
          <div className={`text-red-600 mt-2`}>{typeof state.message !== 'string' && state.message?.email && state.message?.email}</div>
        </div>
      </div>
      <div className={'row-start-2 lg:block'}>
        <button
          className={`bg-amber-50 text-amber-950 border border-amber-950 px-4 py-2 rounded-md text-center ${pending ? 'cursor-not-allowed' : 'cursor-pointer'} grow flex justify-around items-center`}
          role={'button'}
          type={'submit'}
          aria-disabled={pending}
        >
          Request{value ? ` "${value}"` : defaultValue && ` "${defaultValue}"`}{' '}
          <LoaderCircle className={`animate-spin ${pending ? 'block' : 'hidden'}`} />
        </button>
      </div>
    </form>
  ) : (
    <div className={`my-8 p-4 border border-violet-950 rounded-md bg-violet-200 xl:w-1/2`}>
      {state.message && state.message}
    </div>
  )
}
