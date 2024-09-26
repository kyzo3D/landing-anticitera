'use client'

import { Message, useChat } from 'ai/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { setAIAction } from '@/app/chat/actions'
import { ChatList } from '@/app/chat/components/chat-list'
import { ChatPanel } from '@/app/chat/components/chat-panel'
import EmptyChat from '@/app/chat/components/empty-chat'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { Session } from '@/lib/types'
import { cn } from '@/lib/utils'

export interface ChatProps extends React.ComponentProps<'div'> {
  id: string
  initialMessages?: Message[]
  session?: Session
}

const Chat = ({ id, initialMessages, className, session }: ChatProps) => {
  const path = usePathname()
  const [done, setDone] = useState(false)
  const {
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    messages,
    setInput,
    stop
  } = useChat({
    initialMessages,
    onResponse: () => {
      setDone(false)
    },
    onFinish: () => {
      setDone(true)
    }
  })

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, messages, path, session?.user])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    if (messages.length > 0 && !isLoading && done) {
      setAIAction(
        {
          chatId: id,
          messages
        },
        done
      )
    }
  }, [done, id, isLoading, messages])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()
  return (
    <div
      className='group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]'
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList
            messages={messages}
            session={session}
            isLoading={isLoading}
          />
        ) : (
          <MaxWidthWrapper className='pt-10'>
            {!session && (
              <p className='text-center text-sm'>
                <Link href='/login' className='text-primary'>
                  Log in
                </Link>{' '}
                to save your chats and continue the conversation later.
              </p>
            )}
            <EmptyChat />
          </MaxWidthWrapper>
        )}
        <div className='h-px w-full' ref={visibilityRef} />
      </div>
      <ChatPanel
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isAtBottom={isAtBottom}
        isLoading={isLoading}
        scrollToBottom={scrollToBottom}
        setInput={setInput}
        stop={stop}
      />
    </div>
  )
}

export default Chat
