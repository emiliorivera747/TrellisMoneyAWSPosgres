import React from "react";
import { Table } from "@/components/ui/table";
import TableBodyForAssets from "@/features/projected-financial-assets/components/table-body/TableBodyForAssets";
import ProjectedAssetsTableHeader from "@/features/projected-financial-assets/components/table-headers/ProjectedAssetsTableHeader";

import { AssetsTableProps } from "@/features/projected-financial-assets/types/table";
import { AnnualGrowthRate } from "@/features/projected-financial-assets/schemas/formSchemas";

const AssetsTable = ({
  assets,
  fieldName,
  errors,
  register,
}: AssetsTableProps<AnnualGrowthRate>) => {
  return (
    <Table>
      <ProjectedAssetsTableHeader />
      <TableBodyForAssets
        assets={assets}
        fieldName={fieldName}
        errors={errors}
        register={register}
      />
    </Table>
  );
};

export default AssetsTable;
