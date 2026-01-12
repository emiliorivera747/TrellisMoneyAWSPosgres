import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { householdMember } from "@/drizzle/schema";
import { Account } from "@/types/services/plaid/plaid";

/**
 * Fetches household member by user ID with household relations (accounts and items).
 *
 * @param user_id - User's unique ID.
 * @returns Promise resolving to household member with household, accounts, and items, or null if not found.
 *
 * @example
 * const member = await getMemberByUserId("12345");
 * console.log(member?.household?.accounts);
 */
export const getMemberByUserId = async (user_id: string) => {
  const member = await db.query.householdMember.findFirst({
    where: eq(householdMember.userId, user_id),
    with: {
      household: {
        with: {
          accounts: true,
          items: true,
        },
      },
    },
  });

  if (!member) return null;

  // Transform to match expected format (snake_case for compatibility)
  return {
    ...member,
    household_id: member.householdId,
    user_id: member.userId,
    household: member.household
      ? {
          ...member.household,
          household_id: member.household.householdId,
          accounts: (member.household.accounts?.map((acc) => ({
            account_id: acc.accountId,
            name: acc.name,
            type: acc.type,
            subtype: acc.subtype,
            current: acc.current ? Number(acc.current) : null,
            available: acc.available ? Number(acc.available) : null,
            limit: acc.limit ? Number(acc.limit) : null,
            mask: acc.mask,
            official_name: acc.officialName,
            verification_status: acc.verificationStatus,
            persistent_account_id: acc.persistentAccountId,
            expected_annual_return_rate: acc.annualReturnRate
              ? Number(acc.annualReturnRate)
              : null,
            iso_currency_code: acc.isoCurrencyCode,
            unofficial_currency_code: acc.unofficialCurrencyCode,
            item_id: acc.itemId,
            user_id: acc.userId,
            household_id: acc.householdId,
          })) || []) as Account[],
          items: member.household.items?.map((it) => ({
            item_id: it.itemId,
            institution_id: it.institutionId,
            institution_name: it.institutionName,
            webhook: it.webhook,
            error: it.error ? JSON.parse(it.error) : null,
            available_products: it.availableProducts || [],
            billed_products: it.billedProducts || [],
            products: it.products || [],
            consented_products: it.consentedProducts || [],
            request_id: it.requestId,
            update_type: it.updateType,
            consent_expiration_time: it.consentExpirationTime,
            access_token: it.accessToken,
          })) || [],
        }
      : null,
  };
};
