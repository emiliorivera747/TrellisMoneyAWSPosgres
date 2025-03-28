import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

import { getTypeLabel } from "@/features/projected-financial-assets/utils/getTypeLabel";

const InvestmentTypeHeader = ({ assetGroup }: any) => {
  return (
    <TableRow className="text-xs border-none">
      <TableCell
        colSpan={3}
        className="p-0 w-full text-tertiary-900 text-[0.86rem] font-semibold px-4 border-t border-b border-tertiary-200 py-3"
      >
        {getTypeLabel(assetGroup)}
      </TableCell>
    </TableRow>
  );
};

export default InvestmentTypeHeader;
