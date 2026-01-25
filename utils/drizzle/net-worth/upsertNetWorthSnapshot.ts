import { db } from "@/drizzle/db";
import { netWorthSnapshot } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

/**
 * Input type for creating/updating a net worth snapshot
 */
export type NetWorthSnapshotInput = {
  netWorthSnapshotId?: string;
  householdId: string;
  snapshotDate: string;
  snapshotAt?: string;
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
  cashAssets?: string | null;
  investmentAssets?: string | null;
  otherAssets?: string | null;
  creditLiabilities?: string | null;
  loanLiabilities?: string | null;
  otherLiabilities?: string | null;
  calculationVersion?: string | null;
  source?: "SYSTEM" | "BACKFILL" | "MANUAL";
};

/**
 * Creates or updates a net worth snapshot.
 * Uses the unique constraint on (household_id, snapshot_date) to determine if inserting or updating.
 *
 * @param snapshotData - The snapshot data to insert or update
 * @returns The created or updated net worth snapshot, or null if the operation fails
 *
 * @example
 * ```ts
 * const snapshot = await upsertNetWorthSnapshot({
 *   householdId: "household-123",
 *   snapshotDate: "2026-01-24",
 *   totalAssets: "100000.00",
 *   totalLiabilities: "25000.00",
 *   netWorth: "75000.00",
 *   source: "SYSTEM"
 * });
 * ```
 */
export const upsertNetWorthSnapshot = async (
  snapshotData: NetWorthSnapshotInput
) => {
  const netWorthSnapshotId =
    snapshotData.netWorthSnapshotId || crypto.randomUUID();

  try {
    const result = await db
      .insert(netWorthSnapshot)
      .values({
        netWorthSnapshotId,
        householdId: snapshotData.householdId,
        snapshotDate: snapshotData.snapshotDate,
        snapshotAt: snapshotData.snapshotAt,
        totalAssets: snapshotData.totalAssets,
        totalLiabilities: snapshotData.totalLiabilities,
        netWorth: snapshotData.netWorth,
        cashAssets: snapshotData.cashAssets ?? null,
        investmentAssets: snapshotData.investmentAssets ?? null,
        otherAssets: snapshotData.otherAssets ?? null,
        creditLiabilities: snapshotData.creditLiabilities ?? null,
        loanLiabilities: snapshotData.loanLiabilities ?? null,
        otherLiabilities: snapshotData.otherLiabilities ?? null,
        calculationVersion: snapshotData.calculationVersion ?? null,
        source: snapshotData.source ?? "SYSTEM",
      })
      .onConflictDoUpdate({
        target: [netWorthSnapshot.householdId, netWorthSnapshot.snapshotDate],
        set: {
          snapshotAt: sql`excluded.snapshot_at`,
          totalAssets: sql`excluded.total_assets`,
          totalLiabilities: sql`excluded.total_liabilities`,
          netWorth: sql`excluded.net_worth`,
          cashAssets: sql`excluded.cash_assets`,
          investmentAssets: sql`excluded.investment_assets`,
          otherAssets: sql`excluded.other_assets`,
          creditLiabilities: sql`excluded.credit_liabilities`,
          loanLiabilities: sql`excluded.loan_liabilities`,
          otherLiabilities: sql`excluded.other_liabilities`,
          calculationVersion: sql`excluded.calculation_version`,
          source: sql`excluded.source`,
        },
      })
      .returning();

    return result[0] ?? null;
  } catch (error) {
    console.error("Error upserting net worth snapshot:", error);
    throw error;
  }
};

/**
 * Batch upsert multiple net worth snapshots.
 * Useful for backfilling or bulk operations.
 *
 * @param snapshots - Array of snapshot data to insert or update
 * @returns Array of created or updated net worth snapshots
 *
 * @example
 * ```ts
 * const snapshots = await batchUpsertNetWorthSnapshots([
 *   {
 *     householdId: "household-123",
 *     snapshotDate: "2026-01-23",
 *     totalAssets: "99000.00",
 *     totalLiabilities: "25000.00",
 *     netWorth: "74000.00",
 *     source: "BACKFILL"
 *   },
 *   {
 *     householdId: "household-123",
 *     snapshotDate: "2026-01-24",
 *     totalAssets: "100000.00",
 *     totalLiabilities: "25000.00",
 *     netWorth: "75000.00",
 *     source: "SYSTEM"
 *   }
 * ]);
 * ```
 */
export const batchUpsertNetWorthSnapshots = async (
  snapshots: NetWorthSnapshotInput[]
) => {
  if (snapshots.length === 0) return [];

  const values = snapshots.map((snapshot) => ({
    netWorthSnapshotId: snapshot.netWorthSnapshotId || crypto.randomUUID(),
    householdId: snapshot.householdId,
    snapshotDate: snapshot.snapshotDate,
    snapshotAt: snapshot.snapshotAt,
    totalAssets: snapshot.totalAssets,
    totalLiabilities: snapshot.totalLiabilities,
    netWorth: snapshot.netWorth,
    cashAssets: snapshot.cashAssets ?? null,
    investmentAssets: snapshot.investmentAssets ?? null,
    otherAssets: snapshot.otherAssets ?? null,
    creditLiabilities: snapshot.creditLiabilities ?? null,
    loanLiabilities: snapshot.loanLiabilities ?? null,
    otherLiabilities: snapshot.otherLiabilities ?? null,
    calculationVersion: snapshot.calculationVersion ?? null,
    source: snapshot.source ?? "SYSTEM",
  }));

  try {
    const result = await db
      .insert(netWorthSnapshot)
      .values(values)
      .onConflictDoUpdate({
        target: [netWorthSnapshot.householdId, netWorthSnapshot.snapshotDate],
        set: {
          snapshotAt: sql`excluded.snapshot_at`,
          totalAssets: sql`excluded.total_assets`,
          totalLiabilities: sql`excluded.total_liabilities`,
          netWorth: sql`excluded.net_worth`,
          cashAssets: sql`excluded.cash_assets`,
          investmentAssets: sql`excluded.investment_assets`,
          otherAssets: sql`excluded.other_assets`,
          creditLiabilities: sql`excluded.credit_liabilities`,
          loanLiabilities: sql`excluded.loan_liabilities`,
          otherLiabilities: sql`excluded.other_liabilities`,
          calculationVersion: sql`excluded.calculation_version`,
          source: sql`excluded.source`,
        },
      })
      .returning();

    return result;
  } catch (error) {
    console.error("Error batch upserting net worth snapshots:", error);
    throw error;
  }
};
