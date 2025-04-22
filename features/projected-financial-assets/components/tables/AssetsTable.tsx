import React from "react";
import { Table } from "@/components/ui/table";
import TableBodyForAssets from "@/features/projected-financial-assets/components/table-body/TableBodyForAssets";

//Types
import { AssetsTableProps } from "@/features/projected-financial-assets/types/table";

const AssetsTable = ({
  assets,
  form, 
  mode,
}: AssetsTableProps) => {
  return (
    <Table className="">
      <TableBodyForAssets
        assets={assets}
        form={form}
        mode={mode}
      />
    </Table>
  );
};

export default AssetsTable;
