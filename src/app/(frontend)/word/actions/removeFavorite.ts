"use server"

import {getPayload} from 'payload'
import config from '@payload-config'
import { getUser } from '@/app/(frontend)/(auth)/actions/getUser'
import { Customer } from '@/payload-types'
import { revalidatePath } from 'next/cache'


export const removeFavorite = async (
  prevState: {
    success: boolean,
    error?: string | unknown
  },
  formData: FormData,
) => {
  const payload = await getPayload({config})

  const user = await getUser() as Customer
  const word = formData.get('word') as string

  if (!user) {
    return {success: false, error: 'You must be logged in to remove a favorite'}
  }

  try {
    await payload.update({
      collection: 'customers',
      id: user.id,
      data: {
        favorites: [
          ...user.favorites?.filter(item => item !== word)!,
        ]
      }
    })
    revalidatePath(`/word/${word}`)
  } catch (e) {
    console.log('Error removing favorite: ', e)
    return {success: false, error: e}
  }

  return {success: true}
}