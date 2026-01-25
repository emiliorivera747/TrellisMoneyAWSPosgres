/**
 * Represents a security (stock, bond, etc.) within a holding.
 * @export
 * @interface SecurityInfo
 */
export interface SecurityInfo {
  /**
   * Unique identifier for the security.
   * @type {string}
   * @memberof SecurityInfo
   */
  securityId: string;

  /**
   * Name of the security.
   * @type {string | null}
   * @memberof SecurityInfo
   */
  securityName: string | null;

  /**
   * Ticker symbol of the security.
   * @type {string | null}
   * @memberof SecurityInfo
   */
  tickerSymbol: string | null;

  /**
   * Indicates if the security is a cash equivalent.
   * @type {boolean | null}
   * @memberof SecurityInfo
   */
  isCashEquivalent: boolean | null;

  /**
   * Type of the security (e.g., stock, bond, ETF).
   * @type {string | null}
   * @memberof SecurityInfo
   */
  type: string | null;

  /**
   * Closing price of the security.
   * @type {string | null}
   * @memberof SecurityInfo
   */
  closePrice: string | null;

  /**
   * Date when the close price was recorded.
   * @type {string | null}
   * @memberof SecurityInfo
   */
  closePriceAsOf: string | null;

  /**
   * ISO currency code for the security.
   * @type {string | null}
   * @memberof SecurityInfo
   */
  isoCurrencyCode: string | null;

  /**
   * Sector of the security.
   * @type {string | null}
   * @memberof SecurityInfo
   */
  sector: string | null;

  /**
   * Industry of the security.
   * @type {string | null}
   * @memberof SecurityInfo
   */
  industry: string | null;
}

/**
 * Represents a holding (investment) within an account.
 * @export
 * @interface HoldingInfo
 */
export interface HoldingInfo {
  /**
   * Unique identifier for the holding.
   * @type {string}
   * @memberof HoldingInfo
   */
  holdingId: string;

  /**
   * Account identifier that owns this holding.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  accountId: string | null;

  /**
   * Price of the holding as reported by the institution.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  institutionPrice: string | null;

  /**
   * Date when the institution price was recorded.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  institutionPriceAsOf: string | null;

  /**
   * Timestamp when the institution price was recorded.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  institutionPriceDatetime: string | null;

  /**
   * Total value of the holding as reported by the institution.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  institutionValue: string | null;

  /**
   * Cost basis of the holding.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  costBasis: string | null;

  /**
   * Quantity of shares or units held.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  quantity: string | null;

  /**
   * ISO currency code for the holding.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  isoCurrencyCode: string | null;

  /**
   * Quantity of vested shares or units.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  vestedQuantity: string | null;

  /**
   * Value of vested shares or units.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  vestedValue: string | null;

  /**
   * Expected annual return rate for the holding.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  expectedAnnualReturnRate: string | null;

  /**
   * Date when the holding record was created.
   * @type {string}
   * @memberof HoldingInfo
   */
  createdAt: string;

  /**
   * Date when the holding record was last updated.
   * @type {string | null}
   * @memberof HoldingInfo
   */
  updatedAt: string | null;

  /**
   * Security information for this holding.
   * @type {SecurityInfo}
   * @memberof HoldingInfo
   */
  security: SecurityInfo;
}

/**
 * Represents an investment account with its holdings.
 * @export
 * @interface AccountWithHoldings
 */
export interface AccountWithHoldings {
  /**
   * Unique identifier for the account.
   * @type {string}
   * @memberof AccountWithHoldings
   */
  accountId: string;

  /**
   * Available balance in the account.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  availableBalance: string | null;

  /**
   * Current balance in the account.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  currentBalance: string | null;

  /**
   * Credit limit or spending limit for the account.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  limitAmount: string | null;

  /**
   * Masked account number.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  mask: string | null;

  /**
   * Name of the account.
   * @type {string}
   * @memberof AccountWithHoldings
   */
  accountName: string;

  /**
   * Official name of the account as provided by the institution.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  officialName: string | null;

  /**
   * Type of the account.
   * @type {"DEPOSITORY" | "CREDIT" | "LOAN" | "INVESTMENT" | "OTHER"}
   * @memberof AccountWithHoldings
   */
  type: "DEPOSITORY" | "CREDIT" | "LOAN" | "INVESTMENT" | "OTHER";

  /**
   * Subtype of the account (e.g., checking, savings, 401k).
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  subtype: string | null;

  /**
   * Expected annual return rate for the account.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  expectedAnnualReturnRate: string | null;

  /**
   * Category of the account holder.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  holderCategory: string | null;

  /**
   * Persistent identifier for the account across reconnections.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  persistentAccountId: string | null;

  /**
   * Verification status of the account.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  verificationStatus: string | null;

  /**
   * Name used for verification.
   * @type {string | null}
   * @memberof AccountWithHoldings
   */
  verificationName: string | null;

  /**
   * Item identifier that this account belongs to.
   * @type {string}
   * @memberof AccountWithHoldings
   */
  itemId: string;

  /**
   * Household member identifier who owns this account.
   * @type {string}
   * @memberof AccountWithHoldings
   */
  householdMemberId: string;

  /**
   * Date when the account record was created.
   * @type {string}
   * @memberof AccountWithHoldings
   */
  createdAt: string;

  /**
   * Date when the account record was last updated.
   * @type {string}
   * @memberof AccountWithHoldings
   */
  updatedAt: string;

  /**
   * Array of holdings within this account.
   * @type {HoldingInfo[]}
   * @memberof AccountWithHoldings
   */
  holdings: HoldingInfo[];
}

/**
 * Represents the response structure for holdings.
 * @export
 * @interface HoldingsResponse
 */
export interface HoldingsResponse {
  /**
   * Array of investment accounts with their holdings.
   * @type {AccountWithHoldings[]}
   * @memberof HoldingsResponse
   */
  accounts: AccountWithHoldings[];
}
