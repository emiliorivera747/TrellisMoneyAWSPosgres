import { Security, Holding } from "plaid";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import {
  getExistingSecurities,
  upsertSecurities,
} from "@/utils/api-helpers/plaid/investments/securityService";

const PRICE_CHANGE_THRESHOLD = 0.01; // 1% price change
/**
 *
 * Updates the holdings and securities in the database.
 *
 * @param holdings
 * @param securities
 * @param timestamp
 */
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
   * Retrieve all existing Securities
   */
  const existingSecurities = await getExistingSecurities(securities);

  /**
   * Create a map of the securities
   */
  const securitiesMap = new Map(
    existingSecurities.map((security) => [security.security_id, security])
  );

  /**
   * Upsert securities and return security history
   */
  const { securityHistory, securityUpserts } = await upsertSecurities(
    securities,
    user_id,
    timestamp,
    securitiesMap
  );
};
