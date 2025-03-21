import { useEffect, useState } from "react";
import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";

const useSortAssets = (financialAssetsData: { data: Assets[] }) => {
  const [filteredAssets, setFilteredAssets] = useState<Assets[]>([]);

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
