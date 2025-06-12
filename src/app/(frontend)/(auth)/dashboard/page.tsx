import { getUser } from '@/app/(frontend)/(auth)/actions/getUser'
import type { Customer, Word } from '@/payload-types'
import { ResetPasswordButton } from '@/app/(frontend)/(auth)/component/ResetPasswordButton'
import UpdateForm from '../component/UpdateForm'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { RemoveFavorite } from '@/app/(frontend)/word/actions/components/RemoveFavorite'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function Page() {
  const user = (await getUser()) as Customer
  if (!user) {
    redirect('/login')
  }

  const favorites = user.favorites as Word[]

  return (
    <main className={`w-full mx-auto sm:max-w-sm my-8`}>
      <div className={`my-8`}>
        <h1>Hello, {user.firstName ? user.firstName : user.email}</h1>
      </div>
      <UpdateForm user={user} />
      <div className={`my-8`}>
        <h2>Favorite Words</h2>
        <Table>
          <TableCaption>A list of your favorite words.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Word</TableHead>
              <TableHead>Pronunciations</TableHead>
              <TableHead>Syllables</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {favorites?.map((word) => (
            <TableRow key={word.id} >
                <TableCell className="font-medium"><Link
                className={`text-blue-500 underline underline-offset-4`}
                href={`/word/${word.slug}`}
              >
                {word.word}
              </Link></TableCell>
                <TableCell className={`text-center`}>{word.pronunciations.length}</TableCell>
                <TableCell className={`text-center`}>{word.pronunciations.map((p) => p.syllables.length).join(', ')}</TableCell>
                <TableCell className={'justify-center flex'}><RemoveFavorite word={word.id} /></TableCell>
            </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className={`flex justify-start items-center gap-4`}>
        <ResetPasswordButton email={user.email} />
      </div>
    </main>
  )
}
