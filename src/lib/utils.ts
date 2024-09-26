import { type ClassValue, clsx } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileArrayToFileList(files: File[]): FileList {
  const dataTransfer = new DataTransfer()

  files.forEach((file) => {
    dataTransfer.items.add(file)
  })

  return dataTransfer.files
}

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
    case ResultCode.UserSignedOut:
      return 'Logged out!'
  }
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

const currentMonthFirstDate = () => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const currentMonthLastDate = (month = 1) => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth() + month, 0)
}

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

export const Rainbow = [
  'text-white hover:text-white bg-[hsl(var(--chart-1))] hover:bg-[hsl(var(--chart-1))]',
  'text-white hover:text-white bg-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))]',
  'text-white hover:text-white bg-[hsl(var(--chart-3))] hover:bg-[hsl(var(--chart-3))]',
  'text-white hover:text-white bg-[hsl(var(--chart-4))] hover:bg-[hsl(var(--chart-4))]',
  'text-white hover:text-white bg-[hsl(var(--chart-5))] hover:bg-[hsl(var(--chart-5))]',
  'text-white hover:text-white bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]',
  'text-white hover:text-white bg-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]'
]

export const RainbowDates = [
  [...Array(3)].map((_) =>
    randomDate(currentMonthFirstDate(), currentMonthLastDate(2))
  ),
  [...Array(2)].map((_) =>
    randomDate(currentMonthFirstDate(), currentMonthLastDate(2))
  ),
  [...Array(1)].map((_) =>
    randomDate(currentMonthFirstDate(), currentMonthLastDate(2))
  ),
  [...Array(3)].map((_) =>
    randomDate(currentMonthFirstDate(), currentMonthLastDate(2))
  ),
  [...Array(2)].map((_) =>
    randomDate(currentMonthFirstDate(), currentMonthLastDate(2))
  ),
  [...Array(1)].map((_) =>
    randomDate(currentMonthFirstDate(), currentMonthLastDate(2))
  ),
  [...Array(3)].map((_) =>
    randomDate(currentMonthFirstDate(), currentMonthLastDate(2))
  )
]

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN',
  UserSignedOut = 'USER_SIGNED_OUT'
}
