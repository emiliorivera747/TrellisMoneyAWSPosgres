import React from "react";
import {TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FieldValues, Path } from "react-hook-form";

//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";

//Components
import NumberInput from "@/components/form-components/NumberInput";

const TableBodyForAssets = <TFieldValues extends FieldValues>({
  assets,
  defaultValue,
  errors,
  register,
}: TableBodyForAssetsProps<TFieldValues>) => {
  return (
    <TableBody>
      {assets.map((asset, index) => {
        return (
          <TableRow key={index}>
            {/* Asset Name */}
            <TableCell className="font-bold uppercase pl-4">
              {asset.name}
            </TableCell>

            {/* Annual Return Rate */}
            <TableCell className="flex flex-row align-center justify-center text-center">
                <NumberInput
                  id={`asset-${index}`}
                  fieldName={asset.name}
                  errors={errors}
                  register={register}
                  defaultValue={0}
                  errTextSize={"text-[0.7rem]"}
                  h={"h-[2.2rem]"}
                  pt={"pt-0"}
                  px={"px-2"}
                />
                
                <span className="w-[2rem] flex flex-col text-md  text-tertiary-800 align-center justify-center font-normal">
                  %
                </span>
            </TableCell>

            {/* Projection */}
            <TableCell className="font-medium text-secondary-1000 text-center">
              ${asset.projection}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyForAssets;
