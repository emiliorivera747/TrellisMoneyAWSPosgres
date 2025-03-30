import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { convertToMoney } from "@/utils/helper-functions/convertToMoney";
import NumberInputV2 from "@/components/form-components/NumberInputV2";
import InvestmentTypeSubHeader from "../headers/InvestmentTypeSubHeader";
import InvestmentTypeHeader from "../headers/InvestmentTypeHeader";
import AssetName from "../column-items/AssetName";
import { AssetRowProps, AssetGroupProps, ProjectionCellProps, GrowthRateCellProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";



 /**
  * 
  * Displays the group of assets as well as the assets in each group.
  * 
  * @param param0 
  * @returns group of assets
  */ 
const AssetGroup = ({ assetType, assets, form }: AssetGroupProps) => {
    return (
      <React.Fragment>
        <InvestmentTypeHeader assetGroup={assetType} />
        <InvestmentTypeSubHeader />
        {assets?.map((asset, index) => (
          <AssetRow key={index} asset={asset} form={form} />
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
const AssetRow = ({ asset, form }: AssetRowProps) => {
  return (
    <TableRow className="border-none hover:bg-tertiary-100">
      <AssetName asset={asset} />
      <GrowthRateCell asset={asset} form={form} />
      <ProjectionCell value={asset.projection} />
    </TableRow>
  );
};


/**
 * 
 * Displays the growth rate cell.
 * 
 * @param param0 
 * @returns growth rate cell
 */
const GrowthRateCell = ({ asset, form }: GrowthRateCellProps) => (
  <TableCell className="flex items-center justify-center h-[3.6rem] w-[1/3]">
    <FormField
      control={form.control}
      name={asset.name}
      render={({ field }) => (
        <FormItem>
          <NumberInputV2
            defaultValue={(asset.annual_growth_rate * 100).toFixed(2)}
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
 * 
 * Displays the projection cell.
 * 
 * @param param0 
 * @returns projection cell
 */
const ProjectionCell = ({ value }: ProjectionCellProps) => (
  <TableCell className="text-secondary-1000 text-start text-xs font-semibold w-24 overflow-x-auto">
    {convertToMoney(Number(value))}
  </TableCell>
);

export default AssetGroup;