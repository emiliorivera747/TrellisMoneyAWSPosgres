const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/plaid`;
import { ExchangeTokenProps } from "@/types/plaidServices";

/**
 * Plaid service to get identity
 */
const getIdentity = async () => {
  const response = await fetch(`${API_URL}/identity`);
  return response.json();
};

// /**
//  * Plaid service to create link token
//  */
// const createLinkToken = async () => {
//   const response = await fetch(`${API_URL}/create-link-token`, {
//     method: "POST",
//   });
//   return response;
// };

/**
 * Plaid service to create link token
 */
const createLinkToken = async (user_id: string) => {
  const res = await fetch(`${API_URL}/create-link-token`, {
    method: "POST",
    body: JSON.stringify({ user_id }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to create link token");
  return res.json();
};

/**
 * Plaid service to exchange token
 */
const exchangeToken = async ({
  public_token,
  user_id,
  metadata,
}: ExchangeTokenProps) => {
  
  const response = await fetch(`${API_URL}/exchange-token`, {
    method: "POST",
    body: JSON.stringify({
      public_token,
      institution: metadata?.institution ?? { institution_id: "", name: "" },
      accounts: metadata.accounts || [],
      user_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return response;
};

/**
 * Plaid service to get holdings
 */
const getHoldings = async () => {
  const response = await fetch(`${API_URL}/investments/holdings`);
  return response.json();
};

/**
 * Plaid service to get user account information
 */
const getAccount = async () => {
  const response = await fetch(`${API_URL}/account`);
  return response.json();
};

/**
 * Plaid service to get user account balance
 */
const getBalance = async () => {
  const response = await fetch(`${API_URL}/accounts/balance`);
  return response.json();
};

const getNetWorth = async () => {
  const response = await fetch(`${API_URL}/networth`);
  return response.json();
};

const plaidService = {
  getIdentity,
  createLinkToken,
  exchangeToken,
  getHoldings,
  getAccount,
  getBalance,
  getNetWorth,
  // createLinkTokenWithUserId,
};

export default plaidService;
