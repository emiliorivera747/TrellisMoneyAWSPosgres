"use client";
import { useEffect, useState } from "react";
import { Account } from "@/drizzle/schema";

import {
  AccountGroupedByType,
  UseGroupAccountsProps,
} from "@/features/accounts/types/accounts";

/**
 *
 * Responsible for grouping accounts by type
 *
 * @param accounts - The accounts to group
 * @returns
 */
const useGroupAccounts = ({ accounts }: UseGroupAccountsProps) => {
  if (!accounts) return {};
  const [groups, setGroups] = useState<AccountGroupedByType | {}>({});

  useEffect(() => {
    const groupedAccounts = accounts?.reduce(
      (acc: { [key: string]: Account[] }, account) => {
        const { type } = account;

        if (!type) return acc;

        if (!acc[type]) acc[type] = [];

        acc[type].push(account);
        return acc;
      },
      {}
    );
    setGroups(groupedAccounts ? groupedAccounts : {});
  }, [accounts]);

  return { groups };
};

export default useGroupAccounts;
