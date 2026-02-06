import { Account } from "@/drizzle/schema";

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
   * @type {Record<string, Account[]>}
   * @memberof AccountListProps
   */
  groups: Record<string, Account[]>;
}

/**
 * Represents accounts grouped by their type.
 * @export
 * @interface AccountGroupedByType
 */
export interface AccountGroupedByType {
  /**
   * Accounts indexed by type key.
   * @type {Account[]}
   * @memberof AccountGroupedByType
   */
  [key: string]: Account[];
}

/**
 * Properties for the useGroupAccounts hook.
 * @export
 * @interface UseGroupAccountsProps
 */
export interface UseGroupAccountsProps {
  /**
   * Array of accounts to be grouped.
   * @type {Account[] | undefined}
   * @memberof UseGroupAccountsProps
   */
  accounts: Account[] | undefined;
}
