import React from "react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

const InvestmentTypeSubHeader = () => {
  return (
    <TableRow className="text-[0.68rem] border-none text-tertiary-700">
      <TableCell className="pl-4">Asset</TableCell>
      <TableCell>Annual Return Rate</TableCell>
      <TableCell>Projection</TableCell>
    </TableRow>
  );
};

export default InvestmentTypeSubHeader;
