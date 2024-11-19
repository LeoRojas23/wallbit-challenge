import { sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const cartTable = sqliteTable(
  'cart',
  {
    cartId: text('cart_id').notNull(),
    id: integer('id', { mode: 'number' }).notNull(),
    title: text('title').notNull(),
    price: integer('price', { mode: 'number' }).notNull(),
    image: text('image').notNull(),
    quantity: integer('quantity', { mode: 'number' }).notNull(),
    totalPrice: integer('total_price', { mode: 'number' }).notNull(),
    createdAt: text('created_at')
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
      .notNull(),
  },
  t => ({
    pk: primaryKey({
      columns: [t.cartId, t.id],
    }),
  }),
)
