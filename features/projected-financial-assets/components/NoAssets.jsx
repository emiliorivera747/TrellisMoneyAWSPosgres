import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const NoAssets = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="px-4 py-3 text-tertiary-800 font-extralight text-center text-[1rem] h-64 border-t">
          You currently do not have any holdings
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default NoAssets;
