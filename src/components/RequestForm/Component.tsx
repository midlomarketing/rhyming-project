'use client'

import React, { useState } from 'react'

export const RequestForm = () => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.target.value.toLowerCase())
  }

  return (
    <form
      id={`request-word-form`}
      className={`my-8 p-4 border border-violet-950 rounded-md bg-violet-200 xl:w-1/2`}
    >
      <h2 className={`font-bold mb-2 text-center lg:text-start block`}>Request a Word</h2>
      <div className={`flex flex-row flex-wrap justify-center lg:justify-start gap-2 my-4`}>
        <label className={`sr-only`} htmlFor={'word-request'}>
          Email
        </label>
        <input
          onChange={handleChange}
          className={`border border-violet-950 bg-white px-2 py-2 rounded-md grow`}
          id={'word-request'}
          name={'word-request'}
          type={'text'}
          placeholder={'Enter a word'}
          required={true}
        />
        <label className={`sr-only`} htmlFor={'email'}>
          Email
        </label>
        <input
          className={`border border-violet-950 bg-white px-2 py-2 rounded-md grow`}
          id={'request-form'}
          type={'email'}
          name={'email'}
          placeholder={'Enter your email'}
          required={true}
        />
        <button
          className={`bg-amber-50 text-amber-950 border border-amber-950 px-4 py-2 rounded-md text-center cursor-pointer grow`}
          role={'button'}
          type={'submit'}
        >
          Request{value && ` ${value}`}
        </button>
      </div>
    </form>
  )
}
