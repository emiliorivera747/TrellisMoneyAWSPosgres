
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FieldValues, Path } from "react-hook-form";
import React, { useRef } from "react";

//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";

//Components
import NumberInput from "@/components/form-components/NumberInput";
import NumberInputV2 from "@/components/form-components/NumberInputV2";
import LabelOrInput from "@/components/form-components/LabelOrInput";

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
      {assets.map((asset, index) => {
        return (
          <TableRow key={index} className="border-none">
            {/* Asset Name */}
            <TableCell className="font-bold uppercase pl-4 text-xs">
              {asset.name}
            </TableCell>

            {/* Annual Return Rate */}
            <TableCell className="flex flex-row align-center justify-center text-center">
              <LabelOrInput>
                <LabelOrInput.Input>
                  <FormField
                    control={form.control}
                    name={asset.name}
                    render={({ field }) => (
                      <FormItem className={" flex items-center justify-center"}>
                        <FormControl>
                          <NumberInputV2
                            defaultValue={(
                              asset.annual_growth_rate * 100
                            ).toFixed(0)}
                            className="text-xs pl-[1rem]"
                            min={-100}
                            max={100}
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
                  ref={ref}
                  text={`${(asset.annual_growth_rate * 100).toFixed(0)}`}
                />
              </LabelOrInput>
              <span className="w-[2rem] flex flex-col text-md  text-tertiary-800 align-center justify-center font-normal">
                %
              </span>
            </TableCell>

            {/* Projection */}
            <TableCell className="font-medium text-secondary-1000 text-center text-xs">
              ${asset.projection}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyForAssets;
