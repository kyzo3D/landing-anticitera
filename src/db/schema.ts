import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid, json } from 'drizzle-orm/pg-core'

export const users = pgTable('users_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  salt: text('salt').notNull()
})

export const userRelations = relations(users, ({ many }) => ({
  chats: many(chats)
}))

export const chats = pgTable('chats_table', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  path: text('path').notNull(),
  messages: json('messages').array().notNull(),
  sharePath: text('share_path')
})

export const chatsRelations = relations(chats, ({ one }) => ({
  userId: one(users, {
    fields: [chats.userId],
    references: [users.id]
  })
}))

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertChat = typeof chats.$inferInsert
export type SelectChat = typeof chats.$inferSelect
