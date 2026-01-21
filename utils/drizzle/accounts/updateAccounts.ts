// Helpers
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";

// Drizzle
import { db } from "@/drizzle/db";
import { account, Account, Item } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

// Utils
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { generateAccountMap } from "@/utils/api-helpers/accounts/accountMaps";

// Types
import { AccountBase, AccountBalance } from "plaid";

/**
 * Default balance object
 */
const DEFAULT_BALANCE = {
  available: 0,
  current: 0,
  limit: 0,
  iso_currency_code: "",
  unofficial_currency_code: "",
};

/**
 * Update the accounts in the database
 * Optimized to use batch operations via transaction to reduce database round-trips
 */
export async function updateAccounts(
  accountBasePlaid: AccountBase[][],
  accountDb: Account[]
) {
  const plaidAccounts = accountBasePlaid.flat();
  if (plaidAccounts.length === 0) return [];

  const accountMap = generateAccountMap(accountDb);

  /**
   * Prepare all of the rows in one go
   */
  const values = plaidAccounts.map((plaidAccount) => {
    const balances = plaidAccount.balances ?? DEFAULT_BALANCE;
    const accountId = plaidAccount.account_id;
    const { householdMemberId = "", itemId = "" } =
      accountMap.get(accountId) ?? {};

    return {
      accountId:,
      householdMemberId,
      itemId,
      ...extractAccountFromPlaid(plaidAccount, balances),
    };
  });

  try {
    const updatedAccounts = await db
      .insert(account)
      .values(values)
      .onConflictDoUpdate({
        target: account.accountId,
        set: {
          householdMemberId: sql`excluded.household_member_id`,
          itemId: sql`excluded.item_id`,
          accountName: sql`excluded.account_name`,
          officialName: sql`excluded.official_name`,
          mask: sql`excluded.mask`,
          type: sql`excluded.type`,
          subtype: sql`excluded.subtype`,
          availableBalance: sql`excluded.available_balance`,
          currentBalance: sql`excluded.current_balance`,
          limitAmount: sql`excluded.limit_amount`,
          holderCategory: sql`excluded.holder_category`,
        },
      })
      .returning();
    return updatedAccounts;
  } catch (error) {
    return ErrorResponse(error);
  }
}

interface UpdatedAccountsInTx {
  tx: any;
  plaidAccounts: AccountBase[];
  accountsDB: Account[];
}

export const updateAccountsInTx = async ({
  tx,
  plaidAccounts,
  accountsDB,
}: UpdatedAccountsInTx) => {
  
  if (!plaidAccounts.length) return [];

  const accountMap = generateAccountMap(accountsDB);

  const values = plaidAccounts.map((plaidAccount) => {
    const balances = plaidAccount.balances ?? DEFAULT_BALANCE;
    const accountId = plaidAccount.account_id;
    
    const { householdMemberId = "", itemId = "" } =
      accountMap.get(accountId) ?? {};

    return {
      accountId,
      householdMemberId,
      itemId,
      ...extractAccountFromPlaid(plaidAccount, balances),
    };
  });

  return tx
  .insert(account)
  .values(values)
  .onConflictDoUpdate({
    target: account.accountId,
    set: {
      accountName: sql`excluded.account_name`,
      officialName: sql`excluded.official_name`,
      mask: sql`excluded.mask`,
      type: sql`excluded.type`,
      subtype: sql`excluded.subtype`,
      availableBalance: sql`excluded.available_balance`,
      currentBalance: sql`excluded.current_balance`,
      limitAmount: sql`excluded.limit_amount`,
      holderCategory: sql`excluded.holder_category`,
      updatedAt: sql`now()`,
    },
  })
  .returning();
};

const extractAccountFromPlaid = (
  account: AccountBase,
  balances: AccountBalance
) => {
  const accountData = {
    accountName: valueOrDefault(account?.name, ""),
    officialName: account.official_name ?? null,
    mask: account.mask ?? null,
    type: account?.type.toUpperCase() as
      | "DEPOSITORY"
      | "CREDIT"
      | "LOAN"
      | "INVESTMENT"
      | "OTHER",
    subtype: account?.subtype ?? null,
    availableBalance: valueOrDefault(balances?.available, 0).toString(),
    currentBalance: valueOrDefault(balances?.current, 0).toString(),
    limitAmount: valueOrDefault(balances?.limit, 0).toString(),
    holderCategory: account.holder_category ?? null,
  };
  return accountData;
};
