import { NextResponse, NextRequest } from "next/server";

import { withAuth } from "@/lib/protected";
import { db } from "@/drizzle/db";
import { account, householdMember } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

/**
 *
 * Makes updates to accounts based on the account id
 *
 * @param req
 * @param param1 search params
 * @returns
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      const body = await request.json();
      const { user_id, expected_annual_return_rate } = body;
      const { _id } = await params;

      // Validate inputs
      if (!_id || !user_id) {
        return NextResponse.json(
          {
            message: "Missing required fields",
            data: null,
          },
          { status: 400 }
        );
      }

      // First, verify the account belongs to a household member owned by the user
      const accountWithMember = await db
        .select({
          accountId: account.accountId,
          householdMemberId: account.householdMemberId,
          userId: householdMember.userId,
        })
        .from(account)
        .innerJoin(
          householdMember,
          eq(account.householdMemberId, householdMember.householdMemberId)
        )
        .where(
          and(
            eq(account.accountId, _id),
            eq(householdMember.userId, user?.id || user_id)
          )
        )
        .limit(1);

      if (!accountWithMember || accountWithMember.length === 0) {
        return NextResponse.json(
          {
            message: "Account not found or unauthorized",
            data: null,
          },
          { status: 404 }
        );
      }

      // Update the account
      const updatedAccount = await db
        .update(account)
        .set({
          expectedAnnualReturnRate: expected_annual_return_rate.toString(),
        })
        .where(eq(account.accountId, _id))
        .returning();

      return NextResponse.json(
        {
          message: "Success",
          data: updatedAccount[0],
        },
        { status: 200 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      return NextResponse.json(
        {
          message: errorMessage,
          data: null,
        },
        { status: 500 }
      );
    }
  });
}
