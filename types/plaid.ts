// /Users/emiliorivera/Documents/React Applications/Trellis Money/TrellisMoneyAWSPosgres/types/plaid.ts

export interface Profile {
  id: number;
  bio?: string;
  userId: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  created_at: Date;
  updated_at: Date;
  user_id?: string;
  email_verified?: boolean;
  phone_verified?: boolean;
  phone?: string;
  accounts: Account[];
  profile?: Profile;
}

export interface Account {
  account_id: string;
  name: string;
  type: string;
  available: number;
  current: number;
  limit: number;
  iso_currency_code: string;
  unofficial_currency_code: string;
  balances: Balance[];
  holdings: Holding[];
  securities: Security[];
  items: Item[];
  owners: Owner[];
  user_id?: number;
  User?: User;
  timestamp?: Date;
}

export interface Item {
  item_id: string;
  institution_id: string;
  institution_name: string;
  webhook: string;
  request_id: string;
  update_type: string;
  consent_expiration_time: string;
  accountId: string;
  account: Account;
}

export interface Holding {
  holding_id: string;
  account_id: string;
  cost_basis?: number | null;
  institution_price: number;
  institution_price_as_of?: Date | null;
  institution_price_datetime?: Date | null;
  institution_value?: number | null;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
  vested_quantity?: number | null;
  vested_value?: number | null;
  quantity?: number;
  security_id: string;
  securitySecurity_id?: string;
  timestamp?: Date;
}

export interface Security {
  security_id: string;
  isin?: string | null;
  cusip?: string | null;
  sedol?: string | null;
  institution_security_id?: string | null;
  institution_id?: string | null;
  proxy_security_id?: string | null;
  name?: string | null;
  ticker_symbol: string | null;
  is_cash_equivalent?: boolean | null;
  type?: string | null;
  close_price: number | null;
  close_price_as_of: Date | null;
  update_datetime?: Date | null;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
  market_identifier_code?: string | null;
  sector?: string | null;
  industry?: string | null;
  option_contract_id?: string | null;
  timestamp?: Date;
  option_contract?: {
    contract_type: "put" | "call";
    expiration_date: string;
    strike_price: number;
    underlying_security_ticker: string;
  } | null;
  fixed_income?: {
    yield_rate?: {
      percentage?: number;
      type?: "coupon" | "coupon_equivalent" | "discount" | "yield" | null;
    } | null;
    maturity_date?: string | null;
    issue_date?: string | null;
    face_value?: number | null;
  } | null;
}

export interface Balance {
  balance_id: string;
  available: number;
  current: number;
  limit: number;
  iso_currency_code: string;
  unofficial_currency_code: string;
  accountId: string;
  account: Account;
  timestamp?: Date;
}

export interface Owner {
  owner_id: string;
  name?: string;
  phone_number?: string;
  phone_type?: string;
  phone_primary?: boolean;
  email: string;
  email_type?: string;
  email_primary?: boolean;
  street?: string;
  region?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  address_primary?: boolean;
  accountId: string;
  account: Account;
  timestamp?: Date;
}
