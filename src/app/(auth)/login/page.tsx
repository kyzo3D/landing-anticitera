import { redirect } from 'next/navigation'

import LoginForm from '@/app/(auth)/components/login-form'
import { auth } from '@/lib/auth'
import { Session } from '@/lib/types'

export default async function LoginPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/chat')
  }

  return (
    <main className='flex h-screen flex-col items-center justify-center p-4'>
      <LoginForm />
    </main>
  )
}
