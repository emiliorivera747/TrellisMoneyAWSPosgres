import { pgTable, varchar, timestamp, text, integer, serial, numeric, uniqueIndex, boolean, foreignKey, bigint, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm";

export const profile = pgTable("Profile", {
	id: serial().primaryKey().notNull(),
	bio: text(),
	userId: text("user_id").notNull(),
}, (table) => [
	uniqueIndex("Profile_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "Profile_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const profileRelations = relations(profile, ({one}) => ({
	user: one(user, {
		fields: [profile.userId],
		references: [user.userId]
	}),
}));