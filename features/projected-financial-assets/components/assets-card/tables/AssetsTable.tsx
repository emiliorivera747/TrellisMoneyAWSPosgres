"use client";
import { Table } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { TableBody } from "@/components/ui/table";
import { AssetType } from "plaid";

// Components
import AssetGroup from "@/features/projected-financial-assets/components/assets-card/table-body/AssetGroup";

// Context
import { useAssetsFormContext } from "@/context/dashboard/AssetsDashboardProvider";
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

/**
 * Renders the AssetsTable component, which displays a table
 * containing asset-related data using the Table and TableBodyForAssets components.
 */
const AssetsTable = ({ assets }: { assets: ProjectedAsset[] | undefined }) => {
  
  const { form } = useAssetsFormContext();
  const [groups, setGroups] = useState<Record<string, ProjectedAsset[]>>({});
  const { mode } = useDashboardFilters();

  useEffect(() => {
    const grouped = Object.groupBy(assets ?? [], (asset) => asset.type);
    const sortedGroups = Object.fromEntries(
      Object.entries(grouped).map(([type, groupAssets]) => {
        const sortedAssets = [...(groupAssets ?? [])].sort((a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
          return 0;
        });
        return [type, sortedAssets];
      })
    );
    setGroups(sortedGroups);
  }, [assets]);

  return (
    <Table>
      <TableBody>
        {Object.entries(groups)
          .sort(([typeA], [typeB]) => typeB.localeCompare(typeA))
          .map(([key, assets], i) => {
            return (
              <AssetGroup
                key={i}
                assetType={key as AssetType}
                assets={assets}
                form={form}
                mode={mode}
              />
            );
          })}
      </TableBody>
    </Table>
  );
};

export default AssetsTable;
