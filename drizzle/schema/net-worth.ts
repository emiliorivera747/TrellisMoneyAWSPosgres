import {
  pgTable,
  timestamp,
  varchar,
  numeric,
  date,
  foreignKey,
  index,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { household } from "@/drizzle/schema";

/**
 * SnapshotSource enum - Defines how the snapshot was created
 */
export const snapshotSource = pgEnum("SnapshotSource", [
  "SYSTEM",
  "BACKFILL",
  "MANUAL",
]);

/**
 * NetWorthSnapshot schema - Stores point-in-time net worth calculations
 * Tracks assets, liabilities, and net worth for households over time
 */
export const netWorthSnapshot = pgTable(
  "NetWorthSnapshot",
  {
    netWorthSnapshotId: varchar("net_worth_snapshot_id")
      .primaryKey()
      .notNull(),

    // Scope
    householdId: varchar("household_id").notNull(),

    // Point-in-time
    snapshotDate: date("snapshot_date", { mode: "string" }).notNull(),
    snapshotAt: timestamp("snapshot_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    // Totals
    totalAssets: numeric("total_assets", {
      precision: 28,
      scale: 8,
    }).notNull(),
    totalLiabilities: numeric("total_liabilities", {
      precision: 28,
      scale: 8,
    }).notNull(),
    netWorth: numeric("net_worth", {
      precision: 28,
      scale: 8,
    }).notNull(),

    // Optional high-level breakdowns (fast charts, no joins)
    cashAssets: numeric("cash_assets", {
      precision: 28,
      scale: 8,
    }),
    investmentAssets: numeric("investment_assets", {
      precision: 28,
      scale: 8,
    }),
    otherAssets: numeric("other_assets", {
      precision: 28,
      scale: 8,
    }),

    creditLiabilities: numeric("credit_liabilities", {
      precision: 28,
      scale: 8,
    }),
    loanLiabilities: numeric("loan_liabilities", {
      precision: 28,
      scale: 8,
    }),
    otherLiabilities: numeric("other_liabilities", {
      precision: 28,
      scale: 8,
    }),

    // Metadata
    calculationVersion: varchar("calculation_version"),
    source: snapshotSource().default("SYSTEM"),

    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    // Unique constraint on household_id and snapshot_date
    unique("NetWorthSnapshot_household_id_snapshot_date_unique").on(
      table.householdId,
      table.snapshotDate
    ),
    // Indexes
    index("NetWorthSnapshot_household_id_idx").using(
      "btree",
      table.householdId.asc().nullsLast().op("text_ops")
    ),
    index("NetWorthSnapshot_snapshot_date_idx").using(
      "btree",
      table.snapshotDate.asc().nullsLast()
    ),
    // Foreign key
    foreignKey({
      columns: [table.householdId],
      foreignColumns: [household.householdId],
      name: "NetWorthSnapshot_household_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * NetWorthSnapshot relations - Links to household
 */
export const netWorthSnapshotRelations = relations(
  netWorthSnapshot,
  ({ one }) => ({
    household: one(household, {
      fields: [netWorthSnapshot.householdId],
      references: [household.householdId],
    }),
  })
);
