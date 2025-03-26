import { User } from "@supabase/supabase-js";
import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";

import { AssetsWithType } from "@/types/assets";
function updateAssets(
  assets: Assets[],
  data: Record<string, number>,
  user?: User | null
): Assets[] | null {

  const res = assets.map((asset) => {
    const newVal = data[asset.name];
    if (newVal !== undefined) {
      asset.annual_growth_rate = newVal / 100; 
    }
    return { ...asset, user_id: user?.id ?? "", security_id: asset.security_id ?? ""};
  });

  return res;
}

export default updateAssets;
