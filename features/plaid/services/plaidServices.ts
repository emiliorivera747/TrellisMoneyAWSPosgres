const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/plaid`;


/**
 * Plaid service to get identity
 */
const getIdentity = async () => {
  const response = await fetch(`${API_URL}/identity`, {
    method: "POST",
  });
  return response;
};

/**
 * Plaid service to create link token
 */
const createLinkToken = async () => {
    const response = await fetch(`${API_URL}/create-link-token`, {
        method: "POST",
    });
    return response;
}

/**
 * Plaid service to exchange token
 */
const exchangeToken = async (public_token: string) => {
    const response = await fetch(`${API_URL}/exchange-token`, {
        method: "POST",
        body: JSON.stringify({ public_token }),
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
    const response = await fetch(`${API_URL}/investment/holdings`, {
        method: "POST",
    });
    return response;
}

/**
 * Plaid service to get user account information
 */
const getAccount = async () => {
    const response = await fetch(`${API_URL}/account`, {
        method: "POST",
    });
    return response;
}

/**
 * Plaid service to get user account balance
 */
const getBalance = async () => {
    const response = await fetch(`${API_URL}/accounts/balance`, {
        method: "POST",
    });
    return response;
};

const plaidService = {
    getIdentity,
    createLinkToken,
    exchangeToken,
    getHoldings,
    getAccount,
    getBalance,
};

export default plaidService;