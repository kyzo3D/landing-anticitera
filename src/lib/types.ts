import { Message } from 'ai/react'

import { ResultCode } from '@/lib/utils'
import { User } from 'next-auth'

export interface Chat extends Record<string, unknown> {
  id: string
  title: string
  userId: string
  path: string
  messages: Message[]
  createdAt?: Date
  updatedAt?: Date
  sharePath?: string
}

export type Interval = 'month' | 'year'

export interface Result {
  type: string
  resultCode: ResultCode
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: Required<Pick<User, 'id' | 'email'>>
}
