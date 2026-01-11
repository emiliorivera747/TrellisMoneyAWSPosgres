import {
  pgTable,
  timestamp,
  text,
  uniqueIndex,
  foreignKey,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import { user } from "@/src/drizzle/schema/user";
import { account } from "@/src/drizzle/schema/account";
import { item } from "@/src/drizzle/schema/item";

export const householdRole = pgEnum("HouseholdRole", [
  "ADMIN",
  "MEMBER",
  "GUEST",
]);

export const household = pgTable("Household", {
  householdId: text("household_id").primaryKey().notNull(),
  name: text().default("Our Household").notNull(),
  createdBy: text("user_id"),
  createdAt: timestamp("created_at", { precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    mode: "string",
  }).notNull(),
});

export const householdMember = pgTable(
  "HouseholdMember",
  {
    memberId: text("member_id").primaryKey().notNull(),
    name: text().notNull(),
    role: householdRole().default("MEMBER").notNull(),
    dob: timestamp({ precision: 3, mode: "string" }),
    invitedEmail: text("invited_email"),
    inviteStatus: text("invite_status").default("pending").notNull(),
    householdId: text("household_id").notNull(),
    userId: text("user_id"),
  },
  (table) => [
    index("HouseholdMember_household_id_idx").using(
      "btree",
      table.householdId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("HouseholdMember_household_id_invited_email_key").using(
      "btree",
      table.householdId.asc().nullsLast().op("text_ops"),
      table.invitedEmail.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("HouseholdMember_household_id_user_id_key").using(
      "btree",
      table.householdId.asc().nullsLast().op("text_ops"),
      table.userId.asc().nullsLast().op("text_ops")
    ),
    index("HouseholdMember_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.householdId],
      foreignColumns: [household.householdId],
      name: "HouseholdMember_household_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "HouseholdMember_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

export const householdRelations = relations(household, ({ many }) => ({
  accounts: many(account),
  items: many(item),
  householdMembers: many(householdMember),
}));

export const householdMemberRelations = relations(
  householdMember,
  ({ one }) => ({
    household: one(household, {
      fields: [householdMember.householdId],
      references: [household.householdId],
    }),
    user: one(user, {
      fields: [householdMember.userId],
      references: [user.userId],
    }),
  })
);
