import prisma from "@/lib/prisma";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";


/**
 * Adds accounts to the database for the given item.
 *
 * @param item_id - The ID of the item
 * @param accounts - The accounts to be added
 * @returns The added accounts
 */
export const addAccounts = async (
  user_id: string,
  item_id: string,
  accounts: PlaidLinkOnSuccessMetadata["accounts"],
  household_id: string
) => {
  const accountAdded = [];

  for (const account of accounts) {
    const createdAccount = await prisma.account.create({
      data: {
        user: {
          connect: {
            user_id: user_id,
          },
        },
        item: {
          connect: {
            item_id: item_id,
          },
        },
        household: {
          connect: {
            household_id: household_id,
          },
        },
        account_id: account.id,
        name: account.name,
        mask: account.mask || null,
        type: account.type,
        subtype: account.subtype,
        verification_status: account.verification_status || null,
      },
    });
    accountAdded.push(createdAccount);
  }

  return accountAdded;
};
