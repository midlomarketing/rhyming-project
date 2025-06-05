'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'


export interface Response {
  success: boolean
  error?: unknown
}

export const requestWord = async (
  prevState: {
    message?: string | {
      word?: string[],
      email?: string[],
    }
    status?: {
      success?: string
      error?: string
    },
    submitted?: boolean
  },
  formData: FormData,
) => {
  const schema = z.object({
    email: z.string().email(),
    word: z.string().min(2).max(20).regex(/[a-zA-Z]+/g, 'Only letters please').refine(s => !s.includes(' '), 'No spaces allowed'),
  })
  const parse = schema.safeParse({
    email: formData.get('email') as string,
    word: formData.get('word-request') as string,
  })

  if (!parse.success) {
    return { status: { error: 'Invalid form data' }, message: parse.error.flatten().fieldErrors }
  }

  const data = parse.data

  const payload = await getPayload({ config })
  try {
    const dataToSend = Object.entries(data).map(([name, value]) => ({
      field: name,
      value,
    }))

    await payload.create({
      collection: 'form-submissions',
      data: {
        submissionData: dataToSend,
        form: '68005853aabf23eeaf771f34',
      },
    })
    return {
      message: `Requested word: ${data.word}`,
      submitted: true,
      status: { success: `Requested word: ${data.word}` }
    }
  } catch (e) {
    console.log('Submission failed: ', e)
    return {
      message: `Could not request "${data.word}"`,
      submitted: false,
      status: { error: `Could not request "${data.word}"`}
    }
  }
}
