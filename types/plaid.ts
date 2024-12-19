// /Users/emiliorivera/Documents/React Applications/Trellis Money/TrellisMoneyAWSPosgres/types/plaid.ts

import { off } from "process";

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

export interface Balance {
  available?: number | null;
  current?: number | null;
  limit?: number | null;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
  last_updated_datetime?: string | null;
  timestamp?: Date;
}

export interface network_status {
  has_numbers_match: boolean;
  is_numbers_match_verified: boolean;
}

export interface previous_returns {
  has_previous_administrative_returns: boolean;
}
export interface verification_insights {
  network_status: network_status;
  previous_returns: previous_returns;
  account_number_format: string;
}

export interface Account {
  account_id: string;
  balances: Balance;
  mask?: string | null;
  official_name?: string | null;
  subtype: string | null;
  verification_status?: string | null;
  name: string;
  type: string;
  items?: Item;
  owners?: Owner[];
  user_id?: number;
  item_id?: string;
  owner_id?: string;
  User?: User;
  timestamp?: Date;
  verification_insights?: verification_insights;
  persistent_account_id?: string;
  holder_catergory?: string | null;
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
  account_id?: string;
  holding_id?: string;
  cost_basis?: number | null;
  institution_price: number;
  institution_price_as_of?: string | null;
  institution_price_datetime?: string | null;
  institution_value?: number | null;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
  vested_quantity?: number | null;
  vested_value?: number | null;
  quantity?: number;
  security_id: string;
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
  close_price_as_of: string | null;
  update_datetime?: string | null;
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
