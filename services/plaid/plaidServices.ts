import { API_URL } from "@/utils/global-variables/globals";

import { ExchangeTokenProps } from "@/types/plaidServices";


/**
 * Exchanges the public token for an access token.
 * @param {ExchangeTokenProps} props - The properties required to exchange the token.
 * @param {string} props.public_token - The public token received from Plaid Link.
 * @param {Institution} props.institution - The institution object containing institution_id and name.
 * @param {Account[]} props.accounts - The array of accounts associated with the public token.
 */
const exchangeToken = async ({
  public_token,
  institution,
  accounts,
}: ExchangeTokenProps) => {
  await fetch(`${API_URL}/plaid/exchange-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_token, institution, accounts }),
  });
};

const plaidServices = {
  exchangeToken,
};

export default plaidServices;
