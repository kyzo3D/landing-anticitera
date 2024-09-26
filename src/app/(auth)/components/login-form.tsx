'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { authenticate } from '@/app/(auth)/actions'
import LabelInputContainer from '@/app/(auth)/components/label-input-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getMessageFromCode } from '@/lib/utils'

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        toast.success(getMessageFromCode(result.resultCode))
        router.refresh()
      }
    }
  }, [result, router])

  return (
    <form
      action={dispatch}
      className='flex flex-col items-center gap-4 space-y-3'
    >
      <div className='w-full flex-1 rounded-lg border bg-background px-6 pb-4 pt-8 shadow-md md:w-96'>
        <h1 className='mb-3 text-2xl font-bold'>Please log in to continue.</h1>
        <div className='w-full'>
          <LabelInputContainer>
            <Label
              className='mb-3 mt-5 block text-xs font-medium'
              htmlFor='email'
            >
              Email
            </Label>
            <div className='relative'>
              <Input
                className='peer block w-full rounded-md border px-2 py-[9px] text-sm outline-none'
                id='email'
                type='email'
                name='email'
                placeholder='email@example.com'
                required
              />
            </div>
          </LabelInputContainer>
          <div className='mt-4'>
            <Label
              className='mb-3 mt-5 block text-xs font-medium'
              htmlFor='password'
            >
              Password
            </Label>
            <div className='relative'>
              <Input
                className='peer block w-full rounded-md border px-2 py-[9px] text-sm outline-none'
                id='password'
                type='password'
                name='password'
                placeholder='********'
                required
                minLength={8}
              />
            </div>
          </div>
        </div>
        <LoginButton />
      </div>

      <Link
        href='/signup'
        className='flex flex-row gap-1 text-sm text-foreground/50'
      >
        No account yet? <div className='font-semibold underline'>Sign up</div>
      </Link>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      className='my-4 flex h-10 w-full flex-row items-center justify-center rounded-md p-2 text-sm font-semibold'
      aria-disabled={pending}
    >
      {pending ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Log in'}
    </Button>
  )
}
