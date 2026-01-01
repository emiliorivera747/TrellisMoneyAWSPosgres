import { useEffect, useState, useMemo } from "react";
import { TableBody } from "@/components/ui/table";

// Components
import AssetGroup from "@/features/projected-financial-assets/components/table-body/AssetGroup";

// Context
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";
import { useDashboardFilters } from "@/stores/slices/dashboardFilters.selectors";

import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";

/**
 *  Displays the groups of assets as well as the assets in each group.
 *
 * @param param0
 * @returns table body for assets
 */
const TableBodyForAssets = () => {
  const { form } = useDashboardContext();
  const [groups, setGroups] = useState<Record<string, typeof assets>>({});
  const { selectedYear, selectedFilter, mode } = useDashboardFilters();
  const { assets } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });

  useEffect(() => {
    // Group assets by type
    const grouped = Object.groupBy(assets, (asset) => asset.type);

    // Sort assets within each group (e.g., by name or value)
    const sortedGroups = Object.fromEntries(
      Object.entries(grouped).map(([type, groupAssets]) => {
        const sortedAssets = [...groupAssets].sort((a, b) => {
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
    <TableBody>
      {Object.entries(groups)
        .sort(([typeA], [typeB]) => typeB.localeCompare(typeA))
        .map(([key, assets], i) => {
          return (
            <AssetGroup
              key={i}
              assetType={key}
              assets={assets}
              form={form}
              mode={mode}
            />
          );
        })}
    </TableBody>
  );
};

export default TableBodyForAssets;
