"use client";
import { useEffect, useState } from "react";

import {
  AccountGroupedByType,
  AccountWithInstitution,
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
  const [groups, setGroups] = useState<AccountGroupedByType | {}>({});

  useEffect(() => {
    const groupedAccounts = accounts?.reduce(
      (acc: { [key: string]: AccountWithInstitution[] }, account) => {
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
