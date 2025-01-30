import React from "react";
import { Table } from "@/components/ui/table";
import TableBodyForAssets from "@/features/projected-financial-assets/components/table-body/TableBodyForAssets";
import ProjectedAssetsTableHeader from "@/features/projected-financial-assets/components/table-headers/ProjectedAssetsTableHeader";

//Types
import { AssetsTableProps } from "@/features/projected-financial-assets/types/table";

const AssetsTable = ({
  assets,
  form, 
}: AssetsTableProps) => {
  return (
    <Table>
      <TableBodyForAssets
        assets={assets}
        form={form}
      />
    </Table>
  );
};

export default AssetsTable;
