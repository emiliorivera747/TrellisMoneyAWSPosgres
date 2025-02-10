import {
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import React, { useRef } from "react";

//Functions
import { convertToMoney } from "@/utils/helper-functions/convertToMoney";
import { getTypeLabel } from "@/features/projected-financial-assets/utils/getTypeLabel";

//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";

//Components
import NumberInputV2 from "@/components/form-components/NumberInputV2";
import LabelOrInput from "@/components/form-components/LabelOrInput";
import InvestmentTypeSubHeader from "@/features/projected-financial-assets/components/headers/InvestmentTypeSubHeader";
import InvestmentTypeHeader from "@/features/projected-financial-assets/components/headers/InvestmentTypeHeader";

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
      {assets.map((assetGroup, groupIndex) => (
        <React.Fragment key={groupIndex}>
          <InvestmentTypeHeader assetGroup={assetGroup} />
          <InvestmentTypeSubHeader />
          {assetGroup.assets.map((asset, index) => (
            <TableRow
              key={index}
              className="border-none hover:bg-tertiary-100 "
            >
              {/* Asset Name */}
              <TableCell className=" pl-4 text-xs w-[1/3] ">
                <div className="flex flex-col">
                  <span className="font-bold uppercase">{asset.name}</span>
                  <span className="font-normal text-tertiary-800">
                    {asset.shares ? asset.shares + " Shares" : null}
                  </span>
                </div>
              </TableCell>

              {/* Annual Return Rate */}
              <TableCell className="flex flex-row align-center items-center justify-center text-center h-[3.6rem] w-[1/3]">
                <LabelOrInput>
                  <LabelOrInput.Input>
                    <FormField
                      control={form.control}
                      name={asset.name}
                      render={({ field }) => (
                        <FormItem
                          className={"flex items-center justify-center"}
                        >
                          <FormControl>
                            <NumberInputV2
                              defaultValue={asset.annual_growth_rate * 100}
                              className="text-xs pl-[0.5rem]"
                              min={-100}
                              max={100}
                              step={0.01}
                              {...field}
                            />
                          </FormControl>
                          <FormLabel />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </LabelOrInput.Input>
                  <LabelOrInput.Label
                    className="pl-[0.5rem]"
                    ref={ref}
                    text={`${(asset.annual_growth_rate * 100).toFixed(0)}`}
                  />
                </LabelOrInput>
                <span className="w-[2rem] flex flex-col text-md  text-tertiary-800 align-center justify-center font-normal">
                  %
                </span>
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
