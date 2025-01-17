import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";
const TableBodyForAssets = ({ assets }: TableBodyForAssetsProps) => {
  return (
    <TableBody>
      {assets.map((asset, index) => {
        return (
          <TableRow key={index}>
            <TableCell className="font-bold uppercase">{asset.name}</TableCell>
            <TableCell className="text-center">
              <input
              type="number"
              defaultValue={asset.annual_growth_rate}
              className="text-center border rounded-[6px] py-[0.4rem] w-[5rem]"
              />
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
