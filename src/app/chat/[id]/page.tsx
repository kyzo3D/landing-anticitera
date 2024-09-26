import { User, Video } from 'lucide-react'
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat, getChats } from '@/app/chat/actions'
import Chat from '@/app/chat/components/chat'
import ChatSidebar from '@/app/chat/components/chat-sidebar'
import Navbar from '@/app/chat/components/navbar'
import { CalendarHeatmap } from '@/components/ui/calendar-heatmap'
import { auth } from '@/lib/auth'
import { Chat as ChatType, Session } from '@/lib/types'
import { Rainbow, RainbowDates } from '@/lib/utils'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.id)

  if (!chat || 'error' in chat) {
    redirect('/')
  } else {
    return {
      title: chat?.title.toString().slice(0, 50) ?? 'Chat'
    }
  }
}

export default async function ChatIdPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session

  const chats = (await getChats(session?.user?.id)) as ChatType[]

  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const userId = session.user.id as string
  const chat = await getChat(params.id, userId)

  if (!chat || 'error' in chat) {
    redirect('/')
  } else {
    if (chat?.userId !== session?.user?.id) {
      notFound()
    }

    return (
      <div className='mx-auto flex h-screen w-full flex-1 flex-col overflow-hidden bg-muted md:flex-row'>
        <ChatSidebar chats={chats} session={session} />

        <div className='grid h-full w-full grid-cols-10'>
          <div className='col-span-7 flex min-h-screen w-full flex-col'>
            <Navbar />
            <main className='flex flex-1 flex-col bg-background'>
              <div className='relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden'>
                <Chat
                  id={chat.id}
                  session={session}
                  initialMessages={chat.messages}
                />
              </div>
            </main>
          </div>

          <section className='col-span-3 flex flex-col overflow-hidden'>
            <div className='flex h-3/5 flex-col gap-2 rounded-xl bg-muted p-4'>
              <div className='flex h-1/2 w-full items-center justify-center rounded-3xl bg-popover'>
                <User className='h-32 w-32' />
              </div>
              <div className='flex h-1/2 w-full items-center justify-center rounded-3xl bg-popover'>
                <Video className='h-32 w-32' />
              </div>
            </div>
            <div className='flex h-2/5 w-full items-center bg-muted p-2'>
              <CalendarHeatmap
                className='lg:motion-safe:animate-fade-uplg:motion-safe:opacity-0 lg:motion-safe:[animation-delay:4000ms]'
                numberOfMonths={2}
                variantClassnames={Rainbow}
                datesPerVariant={RainbowDates}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}
