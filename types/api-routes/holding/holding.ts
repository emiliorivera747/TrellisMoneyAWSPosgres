/**
 * Represents aggregated details for a holding across multiple accounts.
 * @export
 * @typedef {Object} AggregateHoldingDetails
 */
export type AggregateHoldingDetails = {
  /**
   * The ticker symbol of the security.
   * @type {string}
   * @memberof AggregateHoldingDetails
   */
  tickerSymbol: string;

  /**
   * The name of the security.
   * @type {string}
   * @memberof AggregateHoldingDetails
   */
  securityName: string;

  /**
   * Total value of all holdings of this security.
   * @type {number}
   * @memberof AggregateHoldingDetails
   */
  totalValue: number;

  /**
   * Average cost basis across all holdings.
   * @type {number}
   * @memberof AggregateHoldingDetails
   */
  averageCost: number;

  /**
   * Total return on the holdings, or null if unavailable.
   * @type {number | null}
   * @memberof AggregateHoldingDetails
   */
  totalReturn: number | null;

  /**
   * Total number of shares held.
   * @type {number}
   * @memberof AggregateHoldingDetails
   */
  shares: number;

  /**
   * Array of individual holdings that make up this aggregate.
   * @type {Array<{holdingId: string; account: {name: string}; member: {name: string}; shares: number; totalValue: number; averageCost: number; totalReturn: number; updatedAt: Date}>}
   * @memberof AggregateHoldingDetails
   */
  holdings: [
    {
      holdingId: string;
      account: { name: string };
      member: { name: string };
      shares: number;
      totalValue: number;
      averageCost: number;
      totalReturn: number;
      updatedAt: Date;
    }
  ];
};

/**
 * Represents detailed information for a single holding.
 * @export
 * @typedef {Object} DetailedHolding
 */
export type DetailedHolding = {
  /**
   * Unique identifier for the holding.
   * @type {string}
   * @memberof DetailedHolding
   */
  holdingId: string;

  /**
   * Account information for this holding.
   * @type {{ name: string }}
   * @memberof DetailedHolding
   */
  account: { name: string };

  /**
   * Household member information for this holding.
   * @type {{ name: string }}
   * @memberof DetailedHolding
   */
  member: { name: string };

  /**
   * Number of shares held.
   * @type {number}
   * @memberof DetailedHolding
   */
  shares: number;

  /**
   * Total value of the holding.
   * @type {number}
   * @memberof DetailedHolding
   */
  totalValue: number;

  /**
   * Average cost basis of the holding.
   * @type {number}
   * @memberof DetailedHolding
   */
  averageCost: number;

  /**
   * Total return on the holding.
   * @type {number}
   * @memberof DetailedHolding
   */
  totalReturn: number;

  /**
   * Date when the holding was last updated.
   * @type {Date}
   * @memberof DetailedHolding
   */
  updatedAt: Date;
};
