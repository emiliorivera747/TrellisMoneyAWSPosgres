import { Security, Holding } from "plaid";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import {
  getExistingSecurities,
  upsertSecurities,
} from "@/utils/api-helpers/plaid/investments/securityService";
import {
  upsertHoldings,
  getExistingHoldings,
} from "@/utils/api-helpers/plaid/investments/holdingService";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 *
 * Updates the holdings and securities in the database.
 * Optimized to run queries in parallel and combine all operations in one transaction
 *
 * @param holdings
 * @param securities
 * @param timestamp
 */
export const updateHoldingsAndSecurities = async (
  holdings: Holding[],
  securities: Security[],
  timestamp: string
) => {
  
  /**
   * User Information
   */
  const user = await getUser();
  const user_id = user?.id || "";

  /**
   * Retrieve all existing Securities and Holdings in parallel
   */
  const [existingSecurities, existingHoldings] = await Promise.all([
    getExistingSecurities(securities),
    getExistingHoldings(holdings)
  ]);

  /**
   * Create a map of the securities and holdings
   */
  const securitiesMap = new Map(
    existingSecurities.map((security) => [security.security_id, security])
  );
  const holdingMap = new Map(
    existingHoldings.map((h) => [`${h.security_id}:${h.account_id}`, h])
  );

  /**
   * Upsert securities and holdings, and get their history
   */
  const { securityHistory, securityUpserts } = await upsertSecurities(
    securities,
    user_id,
    timestamp,
    securitiesMap
  );

  const { holdingHistory, holdingUpserts } = await upsertHoldings(
    holdings,
    user_id,
    timestamp,
    holdingMap
  );

  /**
   * Execute all database operations in a single transaction
   * This includes upserts and history creation
   */
  try {
    await prisma.$transaction(async (tx) => {
      // Execute all upserts
      await Promise.all([...securityUpserts, ...holdingUpserts]);
      
      // Create history records in parallel
      const historyPromises = [];
      if (securityHistory.length > 0) {
        historyPromises.push(tx.securityHistory.createMany({ data: securityHistory, skipDuplicates: true }));
      }
      if (holdingHistory.length > 0) {
        historyPromises.push(tx.holdingHistory.createMany({ data: holdingHistory, skipDuplicates: true }));
      }
      
      if (historyPromises.length > 0) {
        await Promise.all(historyPromises);
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Transaction error:", error.message);
    }
    return NextResponse.json(
      { error: "Error updating holdings and securities" },
      { status: 500 }
    );
  }
};
