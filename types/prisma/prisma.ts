import {
  Security,
  Account,
  Household,
  Holding,
} from "@/app/generated/prisma/client";

/**
 * Represents a holding with expanded security information.
 * @export
 * @interface HoldingWithSecurityExpanded
 */
export interface HoldingWithSecurityExpanded extends Holding {
  /**
   * The security associated with the holding.
   * @type {Security}
   * @memberof HoldingWithSecurityExpanded
   */
  security: Security;
}

/**
 * Represents an account with expanded holding information.
 * @export
 * @interface AccountWithHoldingExpanded
 */
export interface AccountWithHoldingExpanded extends Account {
  /**
   * The holdings associated with the account.
   * @type {HoldingWithSecurityExpanded[]}
   * @memberof AccountWithHoldingExpanded
   */
  holdings: HoldingWithSecurityExpanded[];
}

/**
 * Represents a household with expanded account information.
 * @export
 * @interface HouseholdWithAccountsExpanded
 */
export interface HouseholdWithAccountsExpanded extends Household {
  /**
   * The accounts associated with the household.
   * @type {AccountWithHoldingExpanded[]}
   * @memberof HouseholdWithAccountsExpanded
   */
  accounts: AccountWithHoldingExpanded[];
}

