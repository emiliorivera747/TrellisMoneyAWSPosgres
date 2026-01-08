import { Table } from "@/components/ui/table";
import TableBodyForAssets from "@/features/projected-financial-assets/components/assets-card/table-body/TableBodyForAssets";

/**
 * Renders the AssetsTable component, which displays a table
 * containing asset-related data using the Table and TableBodyForAssets components.
 */
const AssetsTable = () => {
  return (
    <Table>
      <TableBodyForAssets />
    </Table>
  );
};

export default AssetsTable;
