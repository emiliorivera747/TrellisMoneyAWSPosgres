"use client";
import { useEffect, useState } from "react";
import { Account, GroupedAccounts } from "@/types/plaid";

/**
 * 
 * Responsible for grouping accounts by type
 * 
 * @param accounts - The accounts to group 
 * @returns 
 */
const useGroupAccounts = ({ accounts }: { accounts: Account[] }) => {
  const [groups, setGroups] = useState<GroupedAccounts>({});
  useEffect(() => {
    const groupedAccounts = accounts?.reduce(
      (acc: { [key: string]: Account[] }, account) => {
        const { type } = account;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(account);
        return acc;
      },
      {}
    );
    setGroups(groupedAccounts);
  }, [accounts]);

  return { groups };
};

export default useGroupAccounts;
