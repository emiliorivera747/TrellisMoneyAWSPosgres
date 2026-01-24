import { API_URL } from "@/utils/global-variables/globals";

import { ExchangeTokenProps } from "@/types/services/requests/plaidServices";

/**
 * Exchanges the public token for an access token.
 * @param {ExchangeTokenProps} props - The properties required to exchange the token.
 * @param {string} props.public_token - The public token received from Plaid Link.
 * @param {PlaidLinkOnSuccessMetadata} props.metadata - The metadata from Plaid Link onSuccess callback.
 * @param {string} props.member_id - The member ID.
 */
const exchangeToken = async ({
  public_token,
  metadata,
  member_id,
}: ExchangeTokenProps) => {
  await fetch(`${API_URL}/plaid/exchange-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_token, metadata, member_id }),
  });
};

const plaidServices = {
  exchangeToken,
};

export default plaidServices;
