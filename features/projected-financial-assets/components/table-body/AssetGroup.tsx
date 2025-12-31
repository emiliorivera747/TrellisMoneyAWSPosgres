import React, { Activity } from "react";
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
import { formatToMoney } from "@/utils/helper-functions/formatting/formatToMoney";

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
      className="border-none hover:bg-tertiary-100 cursor-pointer h-[4.5rem]"
      onClick={handleRowClick}
    >
      <AssetName asset={asset} />

      <Activity mode={mode === "edit" ? "visible" : "hidden"}>
        <GrowthRateCellInput asset={asset} form={form} />
      </Activity>

      <Activity mode={mode === "view" ? "visible" : "hidden"}>
        <GrowthRateCellText asset={asset} />
      </Activity>

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
const GrowthRateCellInput = ({ asset, form }: GrowthRateCellPropsInput) => {
  return (
    <TableCell className="flex justify-center items-end mt-3 w-[1/3]">
      <FormField
        key={`${asset.name}-${asset.account_id}-${asset.security_id}`}
        control={form.control}
        name={`${asset.name}-${asset.account_id}-${asset.security_id}`}
        render={({ field }) => (
          <FormItem>
            <NumberInputV2
              key={`${asset.name}-${asset.account_id}-${asset.security_id}`}
              defaultValue={((asset.annual_growth_rate ?? 0) * 100).toFixed(0)}
              className="text-[0.85rem] pl-2"
              min={-100}
              max={100}
              step={0.1}
              {...field}
            />
          </FormItem>
        )}
      />
    </TableCell>
  );
};

/**
 * Display the growth rate cell text
 */
const GrowthRateCellText = ({ asset }: GrowthRateCellPropsText) => (
  <TableCell className="flex items-center w-[1/3] text-center uppercase justify-center h-[4.5rem] ">
    <p className="text-[0.85rem] pl-2 text-tertiary-900 font-light">
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
  <TableCell className="text-secondary-1000 text-start text-[0.85rem] font-semibold w-24 overflow-x-auto h-[4.5rem]">
    {formatToMoney(Number(value))}
  </TableCell>
);

export default AssetGroup;
