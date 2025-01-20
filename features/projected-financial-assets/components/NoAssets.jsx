import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const NoAssets = () => {
  return (
    <TableBody className="bg-white">
      <TableRow className="">
        <TableCell
          className="px-4 py-3 whitespace-nowrap  text-gray-800 text-center text-sm h-64"
        >
          You currently do not have any holdings
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default NoAssets;
