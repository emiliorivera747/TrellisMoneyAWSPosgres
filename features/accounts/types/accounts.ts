import { AccountWithMember } from "@/features/accounts/services/accountServices";

/**
 * Properties for the account list component.
 * @export
 * @interface AccountListProps
 */
export interface AccountListProps {
  /**
   * Error object if accounts fetch failed.
   * @type {Error | null}
   * @memberof AccountListProps
   */
  accountsError: Error | null;

  /**
   * Indicates if accounts are currently loading.
   * @type {boolean}
   * @memberof AccountListProps
   */
  isLoadingAccounts: boolean;

  /**
   * Indicates if there was an error loading accounts.
   * @type {boolean}
   * @memberof AccountListProps
   */
  isErrorAccounts: boolean;

  /**
   * Accounts grouped by type.
   * @type {Record<string, AccountWithMember[]>}
   * @memberof AccountListProps
   */
  groups: Record<string, AccountWithMember[]>;
}

/**
 * Represents accounts grouped by their type.
 * @export
 * @interface AccountGroupedByType
 */
export interface AccountGroupedByType {
  /**
   * Accounts indexed by type key.
   * @type {AccountWithMember[]}
   * @memberof AccountGroupedByType
   */
  [key: string]: AccountWithMember[];
}

/**
 * Properties for the useGroupAccounts hook.
 * @export
 * @interface UseGroupAccountsProps
 */
export interface UseGroupAccountsProps {
  /**
   * Array of accounts to be grouped.
   * @type {AccountWithMember[] | undefined}
   * @memberof UseGroupAccountsProps
   */
  accounts: AccountWithMember[] | undefined;
}
