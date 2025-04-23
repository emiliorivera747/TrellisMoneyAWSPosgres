import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getTypeLabel } from "@/features/projected-financial-assets/utils/getTypeLabel";

const InvestmentTypeHeader = ({ assetGroup }: any) => {
  return (
    <TableRow className="text-[0.9rem] border-b border-t border-tertiary-300  text-tertiary-800 hover:bg-white h-[3.5rem] font-light">
      <TableCell className="pl-6 text-tertiary-1000 font-bold">{getTypeLabel(assetGroup)}</TableCell>
      <TableCell className='text-[0.75rem]'>Annual Return Rate</TableCell>
      <TableCell className='text-[0.75rem]'>Projection</TableCell>
    </TableRow>
  );
};

export default InvestmentTypeHeader;
