import { Account } from "@/app/generated/prisma/client";

export interface AccountListProps {
  accountsError: Error | null;
  isLoadingAccounts: boolean;
  isErrorAccounts: boolean;
  groups: Record<string, Account[]>;
}

export interface AccountGroupedByType {
  [key: string]: Account[];
}

export interface UseGroupAccountsProps {
  accounts: Account[];
}

