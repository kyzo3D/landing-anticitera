import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { auth, signOut } from '@/lib/auth'
import { Session } from '@/lib/types'

export default async function SignoutPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/chat')
  }

  return (
    <main className='flex h-screen flex-col items-center justify-center p-4'>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <div className='w-full flex-1 rounded-lg border bg-background px-6 pb-4 pt-8 shadow-md md:w-96'>
          <h1 className='mb-3 text-lg font-bold'>
            Are you sure you want to sign out?
          </h1>
          <Button className='my-4 flex h-10 w-full flex-row items-center justify-center rounded-md p-2 text-sm font-semibold'>
            Sign Out
          </Button>
        </div>
      </form>
    </main>
  )
}
