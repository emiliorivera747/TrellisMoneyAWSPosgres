import { Account } from "@/types/services/plaid/plaid";
import { AccountType } from "plaid";
import { Decimal } from "decimal.js";

/**
 * Represents a projected asset with financial projections.
 * @export
 * @interface ProjectedAsset
 */
export interface ProjectedAsset {
  /**
   * Name of the asset.
   * @type {string}
   * @memberof ProjectedAsset
   */
  name: string;

  /**
   * Expected annual return rate for the asset.
   * @type {number | null}
   * @memberof ProjectedAsset
   */
  expected_annual_return_rate: number | null;

  /**
   * Projected future value of the asset.
   * @type {number | null}
   * @memberof ProjectedAsset
   */
  projection: number | null;

  /**
   * Unique identifier for the security.
   * @type {string | undefined | null}
   * @memberof ProjectedAsset
   */
  security_id: string | undefined | null;

  /**
   * Unique identifier for the account.
   * @type {string | undefined}
   * @memberof ProjectedAsset
   */
  account_id: string | undefined;

  /**
   * Type of the account.
   * @type {AccountType}
   * @memberof ProjectedAsset
   */
  type: AccountType;

  /**
   * Subtype of the account.
   * @type {string}
   * @memberof ProjectedAsset
   */
  subtype?: string;

  /**
   * Total value of the asset.
   * @type {number | null}
   * @memberof ProjectedAsset
   */
  total?: number | null;

  /**
   * Number of shares held.
   * @type {number | null}
   * @memberof ProjectedAsset
   */
  shares: number | null;

  /**
   * Unique identifier for the user.
   * @type {string | undefined}
   * @memberof ProjectedAsset
   */
  user_id?: string | undefined;

  /**
   * Array of account identifiers associated with this asset.
   * @type {(string | undefined)[]}
   * @memberof ProjectedAsset
   */
  accounts?: (string | undefined)[];
}

/**
 * Represents a projected asset with high-precision decimal values.
 * @export
 * @interface ProjectedAssetWithDecimal
 */
export interface ProjectedAssetWithDecimal {
  /**
   * Name of the asset.
   * @type {string}
   * @memberof ProjectedAssetWithDecimal
   */
  name: string;

  /**
   * Expected annual return rate for the asset.
   * @type {number | Decimal | null}
   * @memberof ProjectedAssetWithDecimal
   */
  expected_annual_return_rate: number | Decimal | null;

  /**
   * Projected future value of the asset.
   * @type {number | Decimal | null}
   * @memberof ProjectedAssetWithDecimal
   */
  projection: number | Decimal | null;

  /**
   * Unique identifier for the security.
   * @type {string | undefined | null}
   * @memberof ProjectedAssetWithDecimal
   */
  security_id: string | undefined | null;

  /**
   * Unique identifier for the account.
   * @type {string | undefined}
   * @memberof ProjectedAssetWithDecimal
   */
  account_id: string | undefined;

  /**
   * Type of the account.
   * @type {AccountType}
   * @memberof ProjectedAssetWithDecimal
   */
  type: AccountType;

  /**
   * Subtype of the account.
   * @type {string}
   * @memberof ProjectedAssetWithDecimal
   */
  subtype?: string;

  /**
   * Total value of the asset.
   * @type {number | Decimal | null}
   * @memberof ProjectedAssetWithDecimal
   */
  total?: number | Decimal | null;

  /**
   * Number of shares held.
   * @type {number | Decimal | null}
   * @memberof ProjectedAssetWithDecimal
   */
  shares: number | Decimal | null;

  /**
   * Unique identifier for the user.
   * @type {string | undefined}
   * @memberof ProjectedAssetWithDecimal
   */
  user_id?: string | undefined;

  /**
   * Array of account identifiers associated with this asset.
   * @type {(string | undefined)[]}
   * @memberof ProjectedAssetWithDecimal
   */
  accounts?: (string | undefined)[];
}

/**
 * Configuration for generating projected asset calculations.
 * @export
 * @interface ProjectedAssetProjectionConfig
 */
export interface ProjectedAssetProjectionConfig {
  /**
   * Number of years to project into the future.
   * @type {number}
   * @memberof ProjectedAssetProjectionConfig
   */
  years: number;

  /**
   * Whether to include inflation in the projection.
   * @type {boolean}
   * @memberof ProjectedAssetProjectionConfig
   */
  includesInflation: boolean;

  /**
   * Annual inflation rate to apply.
   * @type {number}
   * @memberof ProjectedAssetProjectionConfig
   */
  annualInflationRate: number;

  /**
   * Type of the account.
   * @type {AccountType}
   * @memberof ProjectedAssetProjectionConfig
   */
  type: AccountType;
}

/**
 * Parameters for calculating financial projections.
 * @export
 * @interface ProjectionParams
 */
export interface ProjectionParams {
  /**
   * Starting year for the projection.
   * @type {number}
   * @memberof ProjectionParams
   */
  startYear: number;

  /**
   * Ending year for the projection.
   * @type {number}
   * @memberof ProjectionParams
   */
  endYear: number;

  /**
   * Whether to include inflation in the projection.
   * @type {boolean}
   * @memberof ProjectionParams
   */
  includesInflation?: boolean;

  /**
   * Annual inflation rate to apply.
   * @type {number}
   * @memberof ProjectionParams
   */
  annualInflationRate: number;

  /**
   * Array of accounts to include in the projection.
   * @type {Account[]}
   * @memberof ProjectionParams
   */
  accounts?: Account[];
}
