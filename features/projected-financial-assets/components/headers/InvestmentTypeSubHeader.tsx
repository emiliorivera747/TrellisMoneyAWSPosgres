import React from "react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

const InvestmentTypeSubHeader = () => {
  return (
    <TableRow className="text-[0.7rem] border-b border-t border-tertiary-200 text-tertiary-700 p-0">
      <TableCell className="pl-4 text-[1rem]">Investments</TableCell>
      <TableCell>Annual Return Rate</TableCell>
      <TableCell>Projection</TableCell>
    </TableRow>
  );
};

export default InvestmentTypeSubHeader;
