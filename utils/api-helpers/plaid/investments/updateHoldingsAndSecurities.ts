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
   * Retrieve all existing Securities and Holdings
   */
  const existingSecurities = await getExistingSecurities(securities);
  const existingHoldings = await getExistingHoldings(holdings);

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
   * Upsert securities and return security history
   */
  const { securityHistory, securityUpserts } = await upsertSecurities(
    securities,
    user_id,
    timestamp,
    securitiesMap
  );

  /**
   * Upsert holdings and return holding history
   */
  const { holdingHistory, holdingUpserts } = await upsertHoldings(
    holdings,
    user_id,
    timestamp,
    holdingMap
  );

  const sLen = securities.length;
  const hLen = holdings.length;

  await prisma.$transaction([...securityUpserts, ...holdingUpserts]);
  if (sLen > 0) {
    try {
      await prisma.securityHistory.createMany({ data: securityHistory });
    } catch (error) {
      return NextResponse.json(
        { error: "Error creating securities" },
        { status: 500 }
      );
    }
  }

  if (hLen > 0) {
    try {
      await prisma.holdingHistory.createMany({ data: holdingHistory });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
      return NextResponse.json(
        { error: "Error creating holding history" },
        { status: 500 }
      );
    }
  }
};
