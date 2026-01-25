import { db } from "@/drizzle/db";
import { netWorthSnapshot } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

/**
 * Input type for creating/updating a net worth snapshot.
 * @export
 * @typedef {Object} NetWorthSnapshotInput
 */
export type NetWorthSnapshotInput = {
  /**
   * Unique identifier for the net worth snapshot (optional, auto-generated if not provided).
   * @type {string}
   * @memberof NetWorthSnapshotInput
   */
  netWorthSnapshotId?: string;

  /**
   * Identifier for the household this snapshot belongs to.
   * @type {string}
   * @memberof NetWorthSnapshotInput
   */
  householdId: string;

  /**
   * The date of the snapshot in string format.
   * @type {string}
   * @memberof NetWorthSnapshotInput
   */
  snapshotDate: string;

  /**
   * Timestamp when the snapshot was taken.
   * @type {string}
   * @memberof NetWorthSnapshotInput
   */
  snapshotAt?: string;

  /**
   * Total assets value as a string.
   * @type {string}
   * @memberof NetWorthSnapshotInput
   */
  totalAssets: string;

  /**
   * Total liabilities value as a string.
   * @type {string}
   * @memberof NetWorthSnapshotInput
   */
  totalLiabilities: string;

  /**
   * Net worth value as a string (total assets minus total liabilities).
   * @type {string}
   * @memberof NetWorthSnapshotInput
   */
  netWorth: string;

  /**
   * Cash assets value as a string.
   * @type {string | null}
   * @memberof NetWorthSnapshotInput
   */
  cashAssets?: string | null;

  /**
   * Investment assets value as a string.
   * @type {string | null}
   * @memberof NetWorthSnapshotInput
   */
  investmentAssets?: string | null;

  /**
   * Other assets value as a string.
   * @type {string | null}
   * @memberof NetWorthSnapshotInput
   */
  otherAssets?: string | null;

  /**
   * Credit liabilities value as a string.
   * @type {string | null}
   * @memberof NetWorthSnapshotInput
   */
  creditLiabilities?: string | null;

  /**
   * Loan liabilities value as a string.
   * @type {string | null}
   * @memberof NetWorthSnapshotInput
   */
  loanLiabilities?: string | null;

  /**
   * Other liabilities value as a string.
   * @type {string | null}
   * @memberof NetWorthSnapshotInput
   */
  otherLiabilities?: string | null;

  /**
   * Version identifier for the calculation method used.
   * @type {string | null}
   * @memberof NetWorthSnapshotInput
   */
  calculationVersion?: string | null;

  /**
   * Source of the snapshot data.
   * @type {"SYSTEM" | "BACKFILL" | "MANUAL"}
   * @memberof NetWorthSnapshotInput
   */
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
