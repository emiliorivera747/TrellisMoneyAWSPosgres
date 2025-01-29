import { User } from "@supabase/supabase-js";
import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";

import { AssetsWithType } from "@/types/assets";
function updateAssets(
  assetsWithType: AssetsWithType[],
  data: Record<string, number>,
  user?: User | null
): Assets[] {
  return assetsWithType.flatMap((assetGroup) =>
    assetGroup.assets.map((asset) => ({
      ...asset,
      user_id: user?.id ?? "",
      annual_growth_rate:
        data[asset.name] !== undefined
          ? data[asset.name] / 100
          : asset.annual_growth_rate,
      security_id: asset.security_id ?? "",
      account_id: asset.account_id ?? "",
    }))
  );
}

export default updateAssets;
