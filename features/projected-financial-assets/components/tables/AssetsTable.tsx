import { Table } from "@/components/ui/table";
import TableBodyForAssets from "@/features/projected-financial-assets/components/table-body/TableBodyForAssets";
import { ProjectedAssetCardMode } from "../../types/projectedAssetsCard";

const AssetsTable = () => {
  return (
    <Table>
      <TableBodyForAssets/>
    </Table>
  );
};

export default AssetsTable;
