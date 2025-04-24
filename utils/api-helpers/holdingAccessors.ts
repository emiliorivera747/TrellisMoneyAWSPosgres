import { Holding } from "@/types/plaid";

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

  if (security?.type === "cash") return accountName.slice(0, 8) + " - cash";

  if (security?.ticker_symbol) {
    return holding?.security?.ticker_symbol
      ? holding.security.ticker_symbol
      : "";
  }
  return holding?.security?.name ? holding.security.name : "";
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
  return holding?.annual_return_rate ? holding.annual_return_rate : 0;
};
