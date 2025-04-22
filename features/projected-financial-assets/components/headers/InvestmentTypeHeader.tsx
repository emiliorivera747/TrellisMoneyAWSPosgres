import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getTypeLabel } from "@/features/projected-financial-assets/utils/getTypeLabel";

const InvestmentTypeHeader = ({ assetGroup }: any) => {
  return (
    <TableRow className="text-[0.8rem] border-b border-t border-tertiary-300  text-tertiary-800 hover:bg-white h-10 font-light">
      <TableCell className="pl-6 ">{getTypeLabel(assetGroup)}</TableCell>
      <TableCell>Annual Return Rate</TableCell>
      <TableCell>Projection</TableCell>
    </TableRow>
  );
};

export default InvestmentTypeHeader;
