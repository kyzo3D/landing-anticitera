'use server'

import { Message } from 'ai/react'
import { and, desc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { chats } from '@/db/schema'
import { auth } from '@/lib/auth'
import { Chat } from '@/lib/types'

export type AI = {
  chatId: string
  messages: Message[]
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  const session = await auth()

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  try {
    const results = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId))
      .orderBy(desc(chats.updatedAt))

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const session = await auth()

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chat = await db
    .select()
    .from(chats)
    .where(and(eq(chats.id, id), eq(chats.userId, userId)))
    .then((data) => data[0])

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat as Chat
}

export async function saveChat(chat: Chat, done: boolean) {
  const session = await auth()

  if (session && session.user && done) {
    const updatedAt = new Date()

    await db
      .insert(chats)
      .values(chat)
      .onConflictDoUpdate({
        target: chats.id,
        set: { messages: chat.messages, updatedAt }
      })
  } else {
    return
  }
}

export async function setAIAction(ai: AI, done: boolean) {
  'use server'

  const session = await auth()

  if (session && session.user) {
    const { chatId, messages } = ai
    const userId = session.user.id as string
    const path = `/chat/${chatId}`

    const firstMessageContent = messages[0].content as string
    const title = firstMessageContent.substring(0, 100)

    const chat: Chat = {
      id: chatId,
      title,
      userId,
      messages,
      path
    }

    await saveChat(chat, done)
  } else {
    return
  }
}
