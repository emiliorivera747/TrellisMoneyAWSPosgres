import { User } from "@supabase/supabase-js";
import { FinancialAssets } from "../types/projectedAssets";

function updateAssets(
  assets: FinancialAssets[],
  data: Record<string, number>,
  user?: User | null
): FinancialAssets[] | null {
  
  const res = assets.map((asset) => {
    const newVal =
      data[`${asset.name}-${asset.account_id}-${asset.security_id}`];
    if (newVal) asset.annual_return_rate = newVal / 100;
    return {
      ...asset,
      user_id: user?.id ?? "",
      security_id: asset.security_id ?? "",
      account_id: asset.account_id ?? "",
    };
  });

  return res;
}

export default updateAssets;
