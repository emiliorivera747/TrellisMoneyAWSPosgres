import React, { useEffect, useState } from "react";
import {
  TableBody,
} from "@/components/ui/table";


//Types
import { TableBodyForAssetsProps } from "@/features/projected-financial-assets/types/table";

//Components
import AssetGroup from "@/features/projected-financial-assets/components/table-body/AssetGroup";

/**
 *  Displays the groups of assets as well as the assets in each group.
 * 
 * @param param0 
 * @returns table body for assets
 */
const TableBodyForAssets = ({ assets, form, mode }: TableBodyForAssetsProps) => {
  const [groups, setGroups] = useState<Record<string, typeof assets>>({});

  useEffect(() => {
    const res = Object.groupBy(assets, (assets) => assets.type);
    setGroups(res);
  }, [assets]);

  return (
    <TableBody>
      {Object.entries(groups)
        .sort(([typeA], [typeB]) => typeB.localeCompare(typeA))
        .map(([key, assets], i) => {
          return (
            <AssetGroup key={i} assetType={key} assets={assets} form={form} mode={mode} />
          );
        })}
    </TableBody>
  );
};

export default TableBodyForAssets;
