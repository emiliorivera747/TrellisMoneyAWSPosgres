import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import { Decimal } from "decimal.js";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";
import { AssetType } from "plaid";
import { FutureProjectionData } from "@/types/future-projections/futureProjections";

/**
 * Represents the display mode for the projected asset card.
 * @export
 * @typedef {"edit" | "view"} ProjectedAssetCardMode
 */
export type ProjectedAssetCardMode = "edit" | "view";

/**
 * Properties for the projected asset card component.
 * @export
 * @interface ProjectedAssetCardProps
 * @template TFieldValues - The type of the form field values.
 */
export interface ProjectedAssetCardProps<TFieldValues extends FieldValues> {
  /**
   * Array of projected assets to display.
   * @type {ProjectedAsset[]}
   * @memberof ProjectedAssetCardProps
   */
  ProjectedAsset: ProjectedAsset[] ;

  /**
   * The currently selected year for projections.
   * @type {number}
   * @memberof ProjectedAssetCardProps
   */
  selectedYear: number;

  /**
   * Form instance for handling asset data.
   * @type {any}
   * @memberof ProjectedAssetCardProps
   */
  form: any;

  /**
   * Indicates if the data is currently loading.
   * @type {boolean}
   * @memberof ProjectedAssetCardProps
   */
  isLoading: boolean;

  /**
   * Current display mode (edit or view).
   * @type {ProjectedAssetCardMode}
   * @memberof ProjectedAssetCardProps
   */
  mode: ProjectedAssetCardMode;

  /**
   * Function to toggle between edit and view modes.
   * @type {() => void}
   * @memberof ProjectedAssetCardProps
   */
  handleModeChange: () => void;
}

/**
 * Properties for the projected assets container component.
 * @export
 * @interface ProjecteAssetsContainerProps
 */
export interface ProjecteAssetsContainerProps {
  /**
   * Array of projected assets to display.
   * @type {ProjectedAsset[] | undefined}
   * @memberof ProjecteAssetsContainerProps
   */
  assets: ProjectedAsset[] | undefined;

  /**
   * Child components to render within the container.
   * @type {React.ReactNode}
   * @memberof ProjecteAssetsContainerProps
   */
  children: React.ReactNode;
}

/**
 * Represents the name of a projected asset.
 * @export
 * @interface ProjectedAssetName
 */
export interface ProjectedAssetName {
  /**
   * Name of the asset.
   * @type {string}
   * @memberof ProjectedAssetName
   */
  name: string;
}

/**
 * Properties for a projected asset row component.
 * @export
 * @interface ProjectedAssetRowProps
 */
export interface ProjectedAssetRowProps {
  /**
   * The projected asset to display in this row.
   * @type {ProjectedAsset}
   * @memberof ProjectedAssetRowProps
   */
  asset: ProjectedAsset;

  /**
   * Form instance for handling asset data.
   * @type {any}
   * @memberof ProjectedAssetRowProps
   */
  form: any;

  /**
   * Current display mode (edit or view).
   * @type {ProjectedAssetCardMode}
   * @memberof ProjectedAssetRowProps
   */
  mode: ProjectedAssetCardMode;
}

/**
 * Properties for a grouped set of projected assets.
 * @export
 * @interface ProjectedAssetGroupProps
 */
export interface ProjectedAssetGroupProps {
  /**
   * Type of assets in this group.
   * @type {AssetType}
   * @memberof ProjectedAssetGroupProps
   */
  assetType: AssetType;

  /**
   * Array of assets in this group.
   * @type {ProjectedAsset[]}
   * @memberof ProjectedAssetGroupProps
   */
  assets: ProjectedAsset[];

  /**
   * Form instance for handling asset data.
   * @type {any}
   * @memberof ProjectedAssetGroupProps
   */
  form: any;

  /**
   * Current display mode (edit or view).
   * @type {ProjectedAssetCardMode}
   * @memberof ProjectedAssetGroupProps
   */
  mode: ProjectedAssetCardMode;
}

/**
 * Properties for displaying a projection value cell.
 * @export
 * @interface ProjectionCellProps
 */
export interface ProjectionCellProps {
  /**
   * The projected value to display.
   * @type {number}
   * @memberof ProjectionCellProps
   */
  value: number;
}

/**
 * Properties for a growth rate input cell.
 * @export
 * @interface GrowthRateCellPropsInput
 */
export interface GrowthRateCellPropsInput {
  /**
   * The projected asset for this cell.
   * @type {ProjectedAsset}
   * @memberof GrowthRateCellPropsInput
   */
  asset: ProjectedAsset;

  /**
   * Form instance for handling the growth rate input.
   * @type {any}
   * @memberof GrowthRateCellPropsInput
   */
  form: any;
}

/**
 * Properties for a growth rate text display cell.
 * @export
 * @interface GrowthRateCellPropsText
 */
export interface GrowthRateCellPropsText {
  /**
   * The projected asset for this cell.
   * @type {ProjectedAsset}
   * @memberof GrowthRateCellPropsText
   */
  asset: ProjectedAsset;
}

/**
 * Represents a grouped holding with aggregated information.
 * @export
 * @interface GroupedHolding
 */
export interface GroupedHolding {
  /**
   * Unique identifier for the security.
   * @type {string}
   * @memberof GroupedHolding
   */
  security_id: string;

  /**
   * Name of the holding.
   * @type {string}
   * @memberof GroupedHolding
   */
  name: string;

  /**
   * Total quantity of shares held.
   * @type {Decimal}
   * @memberof GroupedHolding
   */
  quantity: Decimal;

  /**
   * Total value as reported by the institution.
   * @type {Decimal}
   * @memberof GroupedHolding
   */
  institution_value: Decimal;

  /**
   * Expected annual return rate.
   * @type {number}
   * @memberof GroupedHolding
   */
  expected_annual_return_rate: number;

  /**
   * Subtype of the account.
   * @type {string}
   * @memberof GroupedHolding
   */
  subtype: string;

  /**
   * Unique identifier for the account.
   * @type {string}
   * @memberof GroupedHolding
   */
  account_id: string;

  /**
   * Array of account identifiers associated with this holding.
   * @type {(string | undefined)[]}
   * @memberof GroupedHolding
   */
  accounts: (string | undefined)[];
}

/**
 * Properties for the projected asset card form component.
 * @export
 * @interface ProjectedAssetCardFormProps
 */
export interface ProjectedAssetCardFormProps {
  /**
   * Future projection data, which can be valid data, undefined, or an Error.
   * @type {FutureProjectionData | undefined | Error}
   * @memberof ProjectedAssetCardFormProps
   */
  futureProjectionData: FutureProjectionData | undefined | Error;

  /**
   * The selected inflation filter for the projections.
   * @type {InflationFilters}
   * @memberof ProjectedAssetCardFormProps
   */
  selectedInflationFilter: InflationFilters;
}

/**
 * Properties for the assets grid layout component.
 * @export
 * @interface AssetsGridLayoutProps
 */
export interface AssetsGridLayoutProps {
  /**
   * Current display mode (edit or view).
   * @type {ProjectedAssetCardMode}
   * @memberof AssetsGridLayoutProps
   */
  mode: ProjectedAssetCardMode;

  /**
   * Child components to render within the grid.
   * @type {ReactNode}
   * @memberof AssetsGridLayoutProps
   */
  children: ReactNode;
}
