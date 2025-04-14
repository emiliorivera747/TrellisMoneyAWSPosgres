import { Security } from "@/types/plaid";
import { Holding } from "@/types/plaid";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import { getExistingSecurities } from "@/utils/api-helpers/plaid/investments/securityService";

export const updateHoldingsAndSecurities = async (
  holdings: Holding[],
  securities: Security[],
  timestamp: string
) => {
  /**
   * User Information
   */
  const user = await getUser();
  const user_id = user?.id || "";

  /**
   * retrieve all existing Securities
   */
  const existingSecurities = await getExistingSecurities(securities);

  console.log(existingSecurities);
};
