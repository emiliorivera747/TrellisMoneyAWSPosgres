import { useEffect, useState, useMemo } from "react";
import { TableBody } from "@/components/ui/table";
import { AssetType } from "plaid";

// Components
import AssetGroup from "@/features/projected-financial-assets/components/table-body/AssetGroup";

// Context
import { useAssetsFormContext } from "@/context/dashboard/AssetsDashboardProvider";
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";

import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";
import { getAssets } from "@/features/projected-financial-assets/utils/extractAssets";
import { ProjectedAsset } from "../../types/projectedAssets";

/**
 *  Displays the groups of assets as well as the assets in each group.
 *
 * @param param0
 * @returns table body for assets
 */
const TableBodyForAssets = () => {
  const { form } = useAssetsFormContext();
  const [groups, setGroups] = useState<Record<string, ProjectedAsset>>({});
  const { mode } = useDashboardFilters();


  // const assets = useMemo(
  //   () => getAssets(futureProjectionData),
  //   [futureProjectionData]
  // );

  // useEffect(() => {
  //   const grouped = Object.groupBy(assets ?? [], (asset) => asset.type);
  //   const sortedGroups = Object.fromEntries(
  //     Object.entries(grouped).map(([type, groupAssets]) => {
  //       const sortedAssets = [...(groupAssets ?? [])].sort((a, b) => {
  //         if (a.name && b.name) {
  //           return a.name.localeCompare(b.name);
  //         }
  //         return 0;
  //       });
  //       return [type, sortedAssets];
  //     })
  //   );
  //   setGroups(sortedGroups);
  // }, [assets]);

  return (
    <TableBody>
      {/* {Object.entries(groups)
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
        })} */}
    </TableBody>
  );
};

export default TableBodyForAssets;
