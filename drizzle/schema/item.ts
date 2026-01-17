import {
  pgTable,
  timestamp,
  text,
  foreignKey,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { user, account } from "@/drizzle/schema";

/**
 * Item schema - Represents a Plaid connection/item with access tokens
 */
export const item = pgTable(
  "Item",
  {
    itemId: text("item_id").primaryKey().notNull(),
    userId: text("user_id").notNull(),
    institutionId: text("institution_id"),
    institutionName: text("institution_name"),
    accessToken: text("access_token").notNull(),
    webhook: text(),
    errorType: text("error_type"),
    errorCode: text("error_code"),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
  },
  (table) => [
    index("Item_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    index("Item_institution_id_idx").using(
      "btree",
      table.institutionId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "Item_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * ItemStatus schema - Tracks transaction sync status for items
 */
export const itemStatus = pgTable(
  "ItemStatus",
  {
    itemId: text("item_id").primaryKey().notNull(),
    transactionsLastSuccessfulUpdate: timestamp(
      "transactions_last_successful_update",
      {
        precision: 3,
        withTimezone: true,
        mode: "string",
      }
    ),
    transactionsLastFailed: timestamp("transactions_last_failed", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    lastSyncCursor: text("last_sync_cursor"),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
  },
  (table) => [
    foreignKey({
      columns: [table.itemId],
      foreignColumns: [item.itemId],
      name: "ItemStatus_item_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

/**
 * Item relations - Links to user and associated accounts
 */
export const itemRelations = relations(item, ({ one, many }) => ({
  accounts: many(account),
  user: one(user, {
    fields: [item.userId],
    references: [user.userId],
  }),
  itemStatus: one(itemStatus, {
    fields: [item.itemId],
    references: [itemStatus.itemId],
  }),
}));

/**
 * ItemStatus relations - Links to item
 */
export const itemStatusRelations = relations(itemStatus, ({ one }) => ({
  item: one(item, {
    fields: [itemStatus.itemId],
    references: [item.itemId],
  }),
}));
