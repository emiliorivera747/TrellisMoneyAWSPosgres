import { Account, Holding } from "@/types/services/plaid/plaid";
import { AccountType } from "plaid";
import { Decimal } from "decimal.js";

/**
 * Represents the parameters for generating assets from accounts.
 * @export
 * @interface GenerateAssetsFromAccountsParams
 */
export interface GenerateAssetsFromAccountsParams {
  /**
   * The accounts to generate assets from.
   * @type {Account[]}
   * @memberof GenerateAssetsFromAccountsParams
   */
  accounts: Account[];
  /**
   * The number of years to project.
   * @type {number}
   * @memberof GenerateAssetsFromAccountsParams
   */
  years: number;
  /**
   * Whether to include inflation in calculations.
   * @type {boolean}
   * @memberof GenerateAssetsFromAccountsParams
   */
  includesInflation: boolean;
  /**
   * The annual inflation rate.
   * @type {number}
   * @memberof GenerateAssetsFromAccountsParams
   */
  annualInflationRate: number;
  /**
   * The type of account.
   * @type {AccountType}
   * @memberof GenerateAssetsFromAccountsParams
   */
  type: AccountType;
}

/**
 * Represents a grouped holding.
 * @export
 * @interface GroupedHolding
 */
export interface GroupedHolding {
  /**
   * The security ID.
   * @type {string}
   * @memberof GroupedHolding
   */
  security_id: string;
  /**
   * The name of the holding.
   * @type {string}
   * @memberof GroupedHolding
   */
  name: string;
  /**
   * The quantity of the holding.
   * @type {Decimal}
   * @memberof GroupedHolding
   */
  quantity: Decimal;
  /**
   * The institution value of the holding.
   * @type {Decimal}
   * @memberof GroupedHolding
   */
  institution_value: Decimal;
  /**
   * The expected annual return rate.
   * @type {number}
   * @memberof GroupedHolding
   */
  expected_annual_return_rate: number;
  /**
   * The subtype of the holding.
   * @type {string}
   * @memberof GroupedHolding
   */
  subtype: string;
  /**
   * The account ID.
   * @type {string}
   * @memberof GroupedHolding
   */
  account_id: string;
  /**
   * The accounts associated with the holding.
   * @type {(undefined | string)[]}
   * @memberof GroupedHolding
   */
  accounts: (undefined | string)[];
}

/**
 * Represents the parameters for converting a grouped holding to assets.
 * @export
 * @interface GroupedHoldingToAssetsParams
 */
export interface GroupedHoldingToAssetsParams {
  /**
   * The grouped holding to convert.
   * @type {GroupedHolding}
   * @memberof GroupedHoldingToAssetsParams
   */
  grouped_holding: GroupedHolding;
  /**
   * The number of years to project.
   * @type {number}
   * @memberof GroupedHoldingToAssetsParams
   */
  years: number;
  /**
   * Whether to include inflation in calculations.
   * @type {boolean}
   * @memberof GroupedHoldingToAssetsParams
   */
  includesInflation: boolean;
  /**
   * The annual inflation rate.
   * @type {number}
   * @memberof GroupedHoldingToAssetsParams
   */
  annualInflationRate: number;
  /**
   * The type of account.
   * @type {AccountType}
   * @memberof GroupedHoldingToAssetsParams
   */
  type?: AccountType;
}

/**
 * Represents the parameters for converting grouped holdings to assets.
 * @export
 * @interface GroupedHoldingsToAssetsParams
 */
export interface GroupedHoldingsToAssetsParams {
  /**
   * The grouped holdings to convert.
   * @type {GroupedHolding[]}
   * @memberof GroupedHoldingsToAssetsParams
   */
  grouped_holdings: GroupedHolding[];
  /**
   * The number of years to project.
   * @type {number}
   * @memberof GroupedHoldingsToAssetsParams
   */
  years: number;
  /**
   * Whether to include inflation in calculations.
   * @type {boolean}
   * @memberof GroupedHoldingsToAssetsParams
   */
  includesInflation: boolean;
  /**
   * The annual inflation rate.
   * @type {number}
   * @memberof GroupedHoldingsToAssetsParams
   */
  annualInflationRate: number;
  /**
   * The type of account.
   * @type {AccountType}
   * @memberof GroupedHoldingsToAssetsParams
   */
  type: AccountType;
}

/**
 * Represents the parameters for converting cash holdings to assets.
 * @export
 * @interface CashHoldingsToAssets
 */
export interface CashHoldingsToAssets {
  /**
   * The cash holdings to convert.
   * @type {(Holding & { accountName: string })[]}
   * @memberof CashHoldingsToAssets
   */
  cash_holdings: (Holding & { accountName: string })[];
  /**
   * The number of years to project.
   * @type {number}
   * @memberof CashHoldingsToAssets
   */
  years: number;
  /**
   * Whether to include inflation in calculations.
   * @type {boolean}
   * @memberof CashHoldingsToAssets
   */
  includesInflation: boolean;
  /**
   * The annual inflation rate.
   * @type {number}
   * @memberof CashHoldingsToAssets
   */
  annualInflationRate: number;
  /**
   * The type of account.
   * @type {AccountType}
   * @memberof CashHoldingsToAssets
   */
  type: AccountType;
}
