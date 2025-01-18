import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FieldValues } from "react-hook-form";

//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";

//Components
import TextInput from "@/components/form-components/TextInput";
const TableBodyForAssets = <TFieldValues extends FieldValues>({
  assets,
  defaultValue,
  fieldName,
  errors,
  register,
}: TableBodyForAssetsProps<TFieldValues>) => {
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(!showInput);
  };

  return (
    <TableBody>
      {assets.map((asset, index) => {
        return (
          <TableRow key={index}>
            <TableCell className="font-bold uppercase">{asset.name}</TableCell>
            <TableCell className="flex flex-row align-center justify-center text-center">
              <div className="w-[4rem] flex flex-row items-center">
                <form className="flex flex-row">
                  <TextInput
                    type="number"
                    id={`asset-${index}`}
                    placeholder=""
                    fieldName={fieldName}
                    errors={errors}
                    register={register}
                    defaultValue={defaultValue?.toString()}
                    h={"h-[2rem]"}
                    pt={"pt-0"}
                    px={"px-2"}
                  />
                </form>
              </div>
              <span className="w-[2rem] flex flex-col text-md  text-tertiary-800 align-center justify-center font-normal">
                %
              </span>
            </TableCell>
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
