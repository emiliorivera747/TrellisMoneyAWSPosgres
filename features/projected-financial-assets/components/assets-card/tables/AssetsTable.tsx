import { Table } from "@/components/ui/table";
import TableBodyForAssets from "@/features/projected-financial-assets/components/table-body/TableBodyForAssets";

/**
 * A functional component that renders a table for displaying asset-related data.
 * It utilizes the `Table` component as a container and includes the `TableBodyForAssets` 
 * component to populate the table's body with asset-specific rows.
 */
const AssetsTable = () => {
  return (
    <Table>
      <TableBodyForAssets/>
    </Table>
  );
};

export default AssetsTable;
