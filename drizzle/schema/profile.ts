import {
  pgTable,
  text,
  serial,
  uniqueIndex,
  foreignKey,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { user } from "@/drizzle/schema";

/**
 * Profile schema - User profile information (bio, etc.)
 * One-to-one relationship with User
 */
export const profile = pgTable(
  "Profile",
  {
    id: serial().primaryKey().notNull(),
    bio: text(),
    userId: text("user_id").notNull(),
  },
  (table) => [
    uniqueIndex("Profile_user_id_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "Profile_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * Profile relations - One-to-one relationship with user
 */
export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.userId],
  }),
}));
