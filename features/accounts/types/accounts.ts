import { Account } from "@/app/generated/prisma/client";

export interface AccountListProps {
  accountsError: Error | null;
  isLoadingAccounts: boolean;
  isErrorAccounts: boolean;
  groups: Record<string, Account[]>;
}
