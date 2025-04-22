import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getTypeLabel } from "@/features/projected-financial-assets/utils/getTypeLabel";

const InvestmentTypeHeader = ({ assetGroup }: any) => {
  return (
    <TableRow className="text-[0.7rem] border-b border-t border-tertiary-200  text-tertiary-800 p-0 hover:bg-white">
      <TableCell className="pl-6 text-[0.8rem] text-tertiary-900 font-bold">{getTypeLabel(assetGroup)}</TableCell>
      <TableCell>Annual Return Rate</TableCell>
      <TableCell>Projection</TableCell>
    </TableRow>
  );
};

export default InvestmentTypeHeader;
