import {getUser} from '@/app/(frontend)/(auth)/actions/getUser'
import type {Customer} from '@/payload-types'
import { ResetPasswordButton } from '@/app/(frontend)/(auth)/component/ResetPasswordButton'
import UpdateForm from '../component/UpdateForm'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser() as Customer
  if (!user) {
    redirect('/login')
  }

  return <main className={`w-full mx-auto sm:max-w-sm my-8`}>
    <div className={`my-8`}>
      <h1>Hello, {user.firstName ? user.firstName : user.email}</h1>
    </div>
    <UpdateForm user={user} />
    <div className={`flex justify-start items-center gap-4`}>
      <ResetPasswordButton email={user.email} />
    </div>

  </main>

}