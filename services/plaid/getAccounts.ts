import { Item } from "@/drizzle/schema";
const accountsData = [
  {
    account_id: "Rh7KpM9nQwJRxZ8vLmPqTxwoNz12B4D56hjGt",
    balances: {
      available: 2500.75,
      current: 8500.2,
      iso_currency_code: "USD",
      limit: null,
      unofficial_currency_code: null,
    },
    holder_category: "personal",
    mask: "1234",
    name: "Robinhood Brokerage",
    official_name: "Robinhood Individual Investing Account",
    subtype: "brokerage",
    type: "investment",
    access_token: "access-production-7b9e2f4d-8c1a-4e5b-a2d3-f6e7890c3d2b",
  },
  {
    account_id: "Cp5LmPxRtQwJnYvB8vHJmNxwoNz89D1C23hjGt",
    balances: {
      available: 3200.5,
      current: 3200.5,
      iso_currency_code: "USD",
      limit: null,
      unofficial_currency_code: null,
    },
    holder_category: "personal",
    mask: "5678",
    name: "360 Performance Savings",
    official_name: "Capital One 360 Performance Savings",
    subtype: "savings",
    type: "depository",
    access_token: "access-production-3d8f9a1c-5e2b-47d9-b6f4-a1c890e5d7f3",
  },
  {
    account_id: "Cp7RtYvLmPxJnK5HJmB8vZxwoNz45C6D12hjGt",
    balances: {
      available: 500.0,
      current: 750.25,
      iso_currency_code: "USD",
      limit: 1000,
      unofficial_currency_code: null,
    },
    holder_category: "personal",
    mask: "9012",
    name: "Capital One Credit Card",
    official_name: "Capital One Quicksilver Cash Rewards",
    subtype: "credit card",
    type: "credit",
    access_token: "access-production-3d8f9a1c-5e2b-47d9-b6f4-a1c890e5d7f3",
  },
  {
    account_id: "BoA9KpM7nQwJRxZ8vLmPqTxwoNz67B8D34hjGt",
    balances: {
      available: 1200.3,
      current: 1250.75,
      iso_currency_code: "USD",
      limit: null,
      unofficial_currency_code: null,
    },
    holder_category: "personal",
    mask: "3456",
    name: "Checking Account",
    official_name: "Bank of America Advantage Checking",
    subtype: "checking",
    type: "depository",
    access_token: "access-production-b6f2c9e1-7a4d-4f8b-9c3e-5d1a0f7b2e8c",
  },
  {
    account_id: "BoA7RtYvLmPxJnK5HJmB8vZxwoNz45C6D12hjGt",
    balances: {
      available: 1800.0,
      current: 1950.6,
      iso_currency_code: "USD",
      limit: null,
      unofficial_currency_code: null,
    },
    holder_category: "personal",
    mask: "7890",
    name: "Savings Account",
    official_name: "Bank of America Regular Savings",
    subtype: "savings",
    type: "depository",
    access_token: "access-production-b6f2c9e1-7a4d-4f8b-9c3e-5d1a0f7b2e8c",
  },
];

export const getAccounts = async (items: Item[]) => {
  // Get all of the access tokens in items
  const accessTokens = items.map((item) => item.accessToken);

  // Get all of the accounts associated with the access tokens and add corresponding item_id
  const accounts = accountsData
    .filter((account) => accessTokens.includes(account.access_token))
    .map((account) => {
      const item = items.find(
        (item) => item.accessToken === account.access_token
      );
      return {
        ...account,
        item_id: item ? item.itemId : null,
      };
    });

  return accounts;
};
