import { Message } from 'ai/react'
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'

import {
  BotMessage,
  SpinnerMessage,
  UserMessage
} from '@/app/chat/components/messages'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Session } from '@/lib/types'

export interface ChatList {
  isLoading: boolean
  messages: Message[]
  session?: Session
}

export function ChatList({ isLoading, messages, session }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className='relative mx-auto max-w-2xl px-4'>
      {!session ? (
        <>
          <div className='group relative mb-4 flex items-start md:-ml-12'>
            <div className='flex size-[28px] shrink-0 select-none items-center justify-center bg-background shadow-sm'>
              <TriangleAlert className='-mt-1 h-5 w-5' />
            </div>
            <div className='ml-4 flex-1 space-y-2 overflow-hidden px-1'>
              <p className='leading-normal text-muted-foreground'>
                Please{' '}
                <Link href='/login' className='underline'>
                  log in
                </Link>{' '}
                or{' '}
                <Link href='/signup' className='underline'>
                  sign up
                </Link>{' '}
                to save and revisit your chat history!
              </p>
            </div>
          </div>
          <Separator className='my-4' />
        </>
      ) : null}

      {messages.map((message, index) => (
        <div key={message.id} className='whitespace-pre-wrap'>
          {isLoading && message.content.length === 0 && <SpinnerMessage />}
          {message.role === 'user' ? (
            <UserMessage>
              {message.content}

              <div className='flex flex-col gap-2'>
                {message?.experimental_attachments
                  ?.filter(
                    (attachment) =>
                      attachment?.contentType?.startsWith('image/') ||
                      attachment?.contentType?.startsWith('video/')
                  )
                  .map((attachment, index) => (
                    <img
                      key={`${message.id}-${index}`}
                      src={attachment.url}
                      width={500}
                      height={500}
                      alt={attachment.name ?? `attachment-${index}`}
                      className='py-2'
                    />
                  ))}
                {message?.experimental_attachments
                  ?.filter(
                    (attachment) =>
                      attachment?.contentType?.startsWith('application/pdf') ||
                      attachment?.contentType?.startsWith('audio/')
                  )
                  .map((attachment, index) => (
                    <Link
                      className={buttonVariants({
                        variant: 'link'
                      })}
                      key={`${message.id}-${index}`}
                      href={attachment.url}
                      target='_blank'
                      rel='noreferrer'
                      download={attachment.name ?? `attachment-${index}`}
                    >
                      {attachment.name}
                    </Link>
                  ))}
              </div>
            </UserMessage>
          ) : (
            <BotMessage content={message.content} />
          )}

          {index < messages.length - 1 && <Separator className='my-4' />}
        </div>
      ))}
    </div>
  )
}
