import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FormField, FormItem } from "@/components/ui/form";
import NumberInputV2 from "@/components/form-components/NumberInputV2";
import InvestmentTypeHeader from "../headers/InvestmentTypeHeader";
import AssetName from "../column-items/AssetName";
import {
  AssetRowProps,
  AssetGroupProps,
  ProjectionCellProps,
  GrowthRateCellPropsInput,
  GrowthRateCellPropsText,
} from "@/features/projected-financial-assets/types/projectedAssetsCard";

// Utils
import { formatToMoney } from "@/utils/helper-functions/formatToMoney";

/**
 *
 * Displays the group of assets as well as the assets in each group.
 *
 * @param param0
 * @returns group of assets
 */
const AssetGroup = ({ assetType, assets, form, mode }: AssetGroupProps) => {
  return (
    <React.Fragment>
      <InvestmentTypeHeader assetGroup={assetType} />
      {assets?.map((asset, index) => (
        <AssetRow key={index} asset={asset} form={form} mode={mode} />
      ))}
    </React.Fragment>
  );
};

/**
 *
 * Displays the asset name, growth rate, and projection.
 *
 * @param param0
 * @returns assets in the group
 */
const AssetRow = ({ asset, form, mode }: AssetRowProps) => {
  const handleRowClick = () => {
    if (mode === "edit") return;
    window.location.href = "/#";
  };

  return (
    <TableRow
      className="border-none hover:bg-tertiary-100 cursor-pointer"
      onClick={handleRowClick}
    >
      <AssetName asset={asset} />
      {mode === "edit" && <GrowthRateCellInput asset={asset} form={form} />}
      {mode === "view" && <GrowthRateCellText asset={asset} />}
      <ProjectionCell value={asset.projection} />
    </TableRow>
  );
};

/**
 *
 * Displays the growth rate cell with input
 *
 * @param param0
 * @returns growth rate cell
 */
const GrowthRateCellInput = ({ asset, form }: GrowthRateCellPropsInput) => (
  <TableCell className="flex items-center justify-center h-[3.6rem] w-[1/3]">
    <FormField
      control={form.control}
      name={asset.name}
      render={({ field }) => (
        <FormItem>
          <NumberInputV2
            defaultValue={((asset.annual_growth_rate ?? 0) * 100).toFixed(0)}
            className="text-xs pl-2"
            min={-100}
            max={100}
            step={1}
            {...field}
          />
        </FormItem>
      )}
    />
  </TableCell>
);

/**
 * Display the growth rate cell text
 */
const GrowthRateCellText = ({ asset }: GrowthRateCellPropsText) => (
  <TableCell className="flex items-center ml-[20%] h-[3.6rem] w-[1/3] text-center uppercase">
    <p className="text-[0.8rem] pl-2 text-tertiary-900 font-light">
      {((asset.annual_growth_rate ?? 0) * 100).toFixed(0)}%
    </p>
  </TableCell>
);

/**
 *
 * Displays the projection cell.
 *
 * @param param0
 * @returns projection cell
 */
const ProjectionCell = ({ value }: ProjectionCellProps) => (
  <TableCell className="text-secondary-1000 text-start text-xs font-semibold w-24 overflow-x-auto">
    {formatToMoney(Number(value))}
  </TableCell>
);


export default AssetGroup;
