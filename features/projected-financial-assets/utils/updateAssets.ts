import { User } from "@supabase/supabase-js"
import {
  AssetName,
  Assets,
} from "@/features/projected-financial-assets/types/projectedAssetsCard";

function updateAssets(
  assets: Assets[],
  data: any,
  user?: User | null
): Assets[] {
  return assets.map((asset: Assets) => {
    const growthRate = data[asset.name];
    return {
      ...asset,
      user_id: user?.id ?? "",
      annual_growth_rate:
        growthRate !== undefined ? growthRate / 100 : asset.annual_growth_rate,
    };
  });
}

export default updateAssets;
