import {
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import React, { useRef } from "react";

//Functions
import { convertToMoney } from "@/utils/helper-functions/convertToMoney";

//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";

//Components
import NumberInputV2 from "@/components/form-components/NumberInputV2";
import LabelOrInput from "@/components/form-components/LabelOrInput";
import InvestmentTypeSubHeader from "@/features/projected-financial-assets/components/headers/InvestmentTypeSubHeader";
import InvestmentTypeHeader from "@/features/projected-financial-assets/components/headers/InvestmentTypeHeader";
import AssetName from "@/features/projected-financial-assets/components/column-items/AssetName";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const TableBodyForAssets = ({ assets, form }: TableBodyForAssetsProps) => {
  const ref = useRef(null);

  return (
    <TableBody className="">
      {assets?.map((assetGroup, groupIndex) => (
        <React.Fragment key={groupIndex}>
          <InvestmentTypeHeader assetGroup={assetGroup} />
          <InvestmentTypeSubHeader />
          {assetGroup?.assets?.map((asset, index) => (
            <TableRow
              key={index}
              className="border-none hover:bg-tertiary-100 "
            >
              <AssetName asset={asset} />
              {/* Annual Return Rate */}
              <TableCell className="flex flex-row align-center items-center justify-center text-center h-[3.6rem] w-[1/3]">
                <FormField
                  control={form.control}
                  name={asset.name}
                  render={({ field }) => (
                    <FormItem className={"flex items-center justify-center"}>
                      <FormControl>
                        <NumberInputV2
                          defaultValue={(asset.annual_growth_rate * 100).toFixed(2)}
                          className="text-xs pl-[0.5rem]"
                          min={-100}
                          max={100}
                          step={1}
                          {...field}
                        />
                      </FormControl>
                      <FormLabel />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* Projection */}
              <TableCell className=" text-secondary-1000 text-start text-[0.75rem] font-semibold w-[6rem] overflow-x-auto ">
                {convertToMoney(Number(asset.projection))}
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default TableBodyForAssets;
