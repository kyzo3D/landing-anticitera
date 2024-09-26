'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { UserMenu } from '@/app/chat/components/user-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sidebar, SidebarBody } from '@/components/ui/sidebar'
import { Chat, Session } from '@/lib/types'

export interface ChatSidebarProps {
  session: Session
  chats?: Chat[]
}

const ChatSidebar = ({ session, chats }: ChatSidebarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        {open ? (
          <Link
            href='/chat'
            className='group/sidebar relative z-20 flex items-center space-x-2 py-1 text-sm font-normal'
          >
            <Image
              src='/images/isotype.png'
              className='h-6 w-6 flex-shrink-0 rounded-full'
              width={24}
              height={24}
              alt='Anticitera logo'
            />
            <motion.span
              animate={{
                display: open ? 'inline-block' : 'none',
                opacity: open ? 1 : 0
              }}
              className='mt-1 inline-block whitespace-pre p-0 pl-1 font-semibold text-foreground transition duration-150 group-hover/sidebar:translate-x-1'
            >
              Anticitera
            </motion.span>
          </Link>
        ) : (
          <Link
            href='/chat'
            className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
          >
            <Image
              src='/images/isotype.png'
              className='h-6 w-6 flex-shrink-0 rounded-full'
              width={24}
              height={24}
              alt='Anticitera logo'
            />
          </Link>
        )}
        <ScrollArea className='h-full'>
          {chats && open && (
            <div className='flex flex-col gap-2'>
              {chats.map((chat, i) => (
                <>
                  <Link
                    href={`/chat/${chat.id}`}
                    className='group/sidebar relative z-20 flex items-center space-x-2 py-1 text-sm font-normal'
                    key={chat.id}
                  >
                    <motion.span
                      animate={{
                        display: open ? 'inline-block' : 'none',
                        opacity: open ? 1 : 0
                      }}
                      className='mt-1 inline-block whitespace-pre p-0 pl-1 text-foreground hover:text-foreground/80'
                    >
                      {chat.title}
                    </motion.span>
                  </Link>
                  {i !== chats.length - 1 && (
                    <motion.div
                      animate={{
                        display: open ? 'inline-block' : 'none',
                        opacity: open ? 1 : 0
                      }}
                      className='h-px w-full bg-muted-foreground/30'
                      aria-hidden
                      key={i}
                    />
                  )}
                </>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className='flex flex-col gap-2'>
          <ModeToggle />
          {session && <UserMenu session={session} open={open} />}
        </div>
      </SidebarBody>
    </Sidebar>
  )
}

export default ChatSidebar
