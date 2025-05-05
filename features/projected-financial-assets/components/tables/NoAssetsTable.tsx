import React from "react";
import { Table } from "@/components/ui/table";
import NoAssets from "@/features/projected-financial-assets/components/NoAssets";

const NoAssetsTable = () => {
  return (
    <Table>
      <NoAssets />
    </Table>
  );
};

export default NoAssetsTable;
