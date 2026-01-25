import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { household, householdMember, account } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";

// Utils
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";
import { calculateDetailedNetWorth } from "@/utils/api-helpers/net-worth/calculateDetailedNetWorth";
import { upsertNetWorthSnapshot } from "@/utils/drizzle/net-worth/upsertNetWorthSnapshot";

/**
 * Cron job to create daily net worth snapshots for all households.
 *
 * Steps:
 * 1. Fetches all households from the database.
 * 2. For each household, retrieves all accounts for household members.
 * 3. Calculates detailed net worth (total assets, liabilities, and breakdowns).
 * 4. Creates or updates a snapshot record for the current date.
 * 5. Returns a summary of snapshots created.
 *
 * @param req - Incoming `NextRequest`.
 * @returns A `Response` with snapshot summary or an error message.
 */
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.headers.get("x-vercel-cron") !== "true")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    console.log("Running daily net worth snapshot...");

    const today = new Date().toISOString().split("T")[0];
    const snapshotResults = [];

    // Fetch all households
    const households = await db.select().from(household);

    console.log(`Processing ${households.length} households...`);

    // Process households in batches of 20
    const BATCH_SIZE = 20;

    for (let i = 0; i < households.length; i += BATCH_SIZE) {
      const batch = households.slice(i, i + BATCH_SIZE);

      console.log(
        `Processing batch ${Math.floor(i / BATCH_SIZE) + 1} (${
          batch.length
        } households)...`
      );

      // Process all households in the batch in parallel
      const batchPromises = batch.map(async (householdRecord) => {
        try {
          const householdId = householdRecord.householdId;

          // Get all household members for this household
          const members = await db
            .select({ householdMemberId: householdMember.householdMemberId })
            .from(householdMember)
            .where(eq(householdMember.householdId, householdId));

          const memberIds = members.map((m) => m.householdMemberId);

          if (memberIds.length === 0) {
            console.log(`Household ${householdId} has no members, skipping...`);
            return null;
          }

          // Get all accounts for this household's members
          const accounts = await db
            .select()
            .from(account)
            .where(inArray(account.householdMemberId, memberIds));

          if (accounts.length === 0) {
            console.log(
              `Household ${householdId} has no accounts, skipping...`
            );
            return null;
          }

          // Calculate detailed net worth
          const netWorthData = calculateDetailedNetWorth(accounts);

          // Upsert snapshot
          const snapshot = await upsertNetWorthSnapshot({
            householdId,
            snapshotDate: today,
            totalAssets: netWorthData.totalAssets.toString(),
            totalLiabilities: netWorthData.totalLiabilities.toString(),
            netWorth: netWorthData.netWorth.toString(),
            cashAssets: netWorthData.cashAssets.toString(),
            investmentAssets: netWorthData.investmentAssets.toString(),
            otherAssets: netWorthData.otherAssets.toString(),
            creditLiabilities: netWorthData.creditLiabilities.toString(),
            loanLiabilities: netWorthData.loanLiabilities.toString(),
            otherLiabilities: netWorthData.otherLiabilities.toString(),
            calculationVersion: "1.0",
            source: "SYSTEM",
          });

          console.log(
            `Created snapshot for household ${householdId}: Net worth $${netWorthData.netWorth.toFixed(
              2
            )}`
          );

          return {
            householdId,
            netWorth: netWorthData.netWorth,
            snapshotId: snapshot?.netWorthSnapshotId,
          };
        } catch (householdError) {
          console.error(
            `Error processing household ${householdRecord.householdId}:`,
            householdError
          );
          return null;
        }
      });

      // Wait for all households in the batch to complete
      const batchResults = await Promise.all(batchPromises);

      // Add successful results to the array
      snapshotResults.push(...batchResults.filter((result) => result !== null));
    }

    return NextResponse.json({
      status: "success",
      message: `Created ${snapshotResults.length} snapshots for ${households.length} households`,
      snapshotDate: today,
      snapshots: snapshotResults,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
