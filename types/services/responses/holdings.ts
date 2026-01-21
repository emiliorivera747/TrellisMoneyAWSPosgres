/**
 * Represents a security (stock, bond, etc.) within a holding.
 * @export
 * @interface SecurityInfo
 */
export interface SecurityInfo {
  securityId: string;
  securityName: string | null;
  tickerSymbol: string | null;
  isCashEquivalent: boolean | null;
  type: string | null;
  closePrice: string | null;
  closePriceAsOf: string | null;
  isoCurrencyCode: string | null;
  sector: string | null;
  industry: string | null;
}

/**
 * Represents a holding (investment) within an account.
 * @export
 * @interface HoldingInfo
 */
export interface HoldingInfo {
  holdingId: string;
  accountId: string | null;
  institutionPrice: string | null;
  institutionPriceAsOf: string | null;
  institutionPriceDatetime: string | null;
  institutionValue: string | null;
  costBasis: string | null;
  quantity: string | null;
  isoCurrencyCode: string | null;
  vestedQuantity: string | null;
  vestedValue: string | null;
  expectedAnnualReturnRate: string | null;
  createdAt: string;
  updatedAt: string | null;
  security: SecurityInfo;
}

/**
 * Represents an investment account with its holdings.
 * @export
 * @interface AccountWithHoldings
 */
export interface AccountWithHoldings {
  accountId: string;
  availableBalance: string | null;
  currentBalance: string | null;
  limitAmount: string | null;
  mask: string | null;
  accountName: string;
  officialName: string | null;
  type: "DEPOSITORY" | "CREDIT" | "LOAN" | "INVESTMENT" | "OTHER";
  subtype: string | null;
  expectedAnnualReturnRate: string | null;
  holderCategory: string | null;
  persistentAccountId: string | null;
  verificationStatus: string | null;
  verificationName: string | null;
  itemId: string;
  householdMemberId: string;
  createdAt: string;
  updatedAt: string;
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
