import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FieldValues, Path } from "react-hook-form";

//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";

//Components
import NumberInput from "@/components/form-components/NumberInput";
import NumberInputV2 from "@/components/form-components/NumberInputV2";

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
  return (
    <TableBody className="border-b">
      {assets.map((asset, index) => {
        return (
          <TableRow key={index} className="border-none">
            {/* Asset Name */}
            <TableCell className="font-bold uppercase pl-4 text-xs">
              {asset.name}
            </TableCell>

            {/* Annual Return Rate */}
            <TableCell className="flex flex-row align-center justify-center text-center">
              <FormField
                control={form.control}
                name={asset.name}
                render={({ field }) => (
                  <FormItem className={" flex items-center justify-center"}>
                    <FormControl>
                      <NumberInputV2 className="" min={-100} max={100} {...field} />
                    </FormControl>
                    <FormLabel />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
