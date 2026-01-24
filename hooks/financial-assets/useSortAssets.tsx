import { useEffect, useState } from "react";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

const useSortAssets = (financialAssetsData: { data: ProjectedAsset[] }) => {
  const [filteredAssets, setFilteredAssets] = useState<ProjectedAsset[]>([]);

  useEffect(() => {
    if (financialAssetsData?.data) {
      const sortedAssets = financialAssetsData.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredAssets(sortedAssets);
    }
  }, [financialAssetsData]);

  return filteredAssets;
};

export default useSortAssets;
