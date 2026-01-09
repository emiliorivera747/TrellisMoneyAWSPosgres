import { Holding } from "@/types/services/plaid/plaid";

/**
 * Quantity getter function
 *
 * @param holding
 * @returns
 */
export const getQuantity = (holding: Holding) => {
  return holding?.quantity ? holding.quantity : 0;
};

/**
 * Get the holding name
 */
export const getHoldingName = (holding: Holding) => {
  const security = holding?.security;

  if (security?.type === "cash") return "cash";
  if (security?.ticker_symbol) {
    return holding?.security?.ticker_symbol
      ? holding.security.ticker_symbol
      : "";
  }
  return holding?.security?.name ? holding.security.name : "";
};

/**
 * Get the holding name based on the account name and holding
 */
export const getHoldingNameV2 = (holding: Holding, accountName: string) => {
  const security = holding?.security;

  if (security?.type === "cash") return accountName + " - cash";

  if (security?.ticker_symbol) {
    return holding?.security?.ticker_symbol
      ? holding.security.ticker_symbol
      : "";
  }
  return holding?.security?.name ? holding.security.name : "";
};

/**
 *
 * Calculates the holdings total amount
 *
 * @param holding
 * @returns
 */
export const getTotal = (holding: Holding) => {
  const p = getClosePrice(holding);
  const q = getQuantity(holding);

  return Number(p) * Number(q);
};

/**
 * Close price getter function
 *
 * @param holding
 * @returns
 */
export const getClosePrice = (holding: Holding) => {
  return holding?.security?.close_price ? holding.security.close_price : 0;
};

/**
 * Annual return rate getter function
 *
 * @param holding
 * @returns
 */
export const getAnnualReturnRate = (holding: Holding) => {
  return holding?.expected_annual_return_rate ? holding.expected_annual_return_rate : 0;
};

/**
 * 
 * Get the institutional value
 * 
 * @param holding 
 * @returns 
 */
export const getInstitutionalValue = (holding: Holding) => {
  return holding?.institution_value ? holding.institution_value : 0;
};
