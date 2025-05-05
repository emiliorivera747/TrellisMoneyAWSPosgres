import { Decimal } from "decimal.js";

import {
  AccountBalance,
  AccountType,
  AccountSubtype,
  AccountBaseVerificationStatusEnum,
  AccountVerificationInsights,
  AccountHolderCategory,
  PlaidError,
  Products,
  ItemUpdateTypeEnum,
} from "plaid";
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
  available?: number | null | Decimal;
  current?: number | null | Decimal;
  limit?: number | null | Decimal;
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
  balances?: Balance;
  mask?: string | undefined | null;
  official_name?: string | undefined | null;
  subtype: string | undefined | null;
  verification_status?: string | undefined | null;
  annual_return_rate?: number | null | Decimal;
  current?: number | null | Decimal;
  name: string;
  type: string;
  items?: Item;
  owners?: Owner[];
  user_id?: string;
  item_id?: string | undefined | null;
  owner_id?: string;
  User?: User;
  timestamp?: Date | undefined | null;
  verification_insights?: verification_insights | null | undefined;
  persistent_account_id?: string | undefined | null;
  holder_catergory?: string | undefined | null;
  holdings?: Holding[];
}

export interface AccountBaseWithItemId {
  /**
   * Plaid’s unique identifier for the account. This value will not change unless Plaid can\'t reconcile the account with the data returned by the financial institution. This may occur, for example, when the name of the account changes. If this happens a new `account_id` will be assigned to the account.  The `account_id` can also change if the `access_token` is deleted and the same credentials that were used to generate that `access_token` are used to generate a new `access_token` on a later date. In that case, the new `account_id` will be different from the old `account_id`.  If an account with a specific `account_id` disappears instead of changing, the account is likely closed. Closed accounts are not returned by the Plaid API.  Like all Plaid identifiers, the `account_id` is case sensitive.
   * @type {string}
   * @memberof AccountBase
   */
  account_id: string;
  /**
   *
   * @type {AccountBalance}
   * @memberof AccountBase
   */
  balances: AccountBalance;
  /**
   * The last 2-4 alphanumeric characters of an account\'s official account number. Note that the mask may be non-unique between an Item\'s accounts, and it may also not match the mask that the bank displays to the user.
   * @type {string}
   * @memberof AccountBase
   */
  mask: string | null;
  /**
   * The name of the account, either assigned by the user or by the financial institution itself
   * @type {string}
   * @memberof AccountBase
   */
  name: string;
  /**
   * The official name of the account as given by the financial institution
   * @type {string}
   * @memberof AccountBase
   */
  official_name: string | null;
  /**
   *
   * @type {AccountType}
   * @memberof AccountBase
   */
  type: AccountType;
  /**
   *
   * @type {AccountSubtype}
   * @memberof AccountBase
   */
  subtype: AccountSubtype | null;
  /**
   * The current verification status of an Auth Item initiated through micro-deposits or database verification. Returned for Auth Items only.  `pending_automatic_verification`: The Item is pending automatic verification  `pending_manual_verification`: The Item is pending manual micro-deposit verification. Items remain in this state until the user successfully verifies the micro-deposit.  `automatically_verified`: The Item has successfully been automatically verified   `manually_verified`: The Item has successfully been manually verified  `verification_expired`: Plaid was unable to automatically verify the deposit within 7 calendar days and will no longer attempt to validate the Item. Users may retry by submitting their information again through Link.  `verification_failed`: The Item failed manual micro-deposit verification because the user exhausted all 3 verification attempts. Users may retry by submitting their information again through Link.  `database_matched`: The Item has successfully been verified using Plaid\'s data sources. Only returned for Auth Items created via Database Match.  `database_insights_pass`: The Item\'s numbers have been verified using Plaid\'s data sources and have strong signal for being valid. Only returned for Auth Items created via Database Insights. Note: Database Insights is currently a beta feature, please contact your account manager for more information.  `database_insights_pass_with_caution`: The Item\'s numbers have been verified using Plaid\'s data sources and have some signal for being valid. Only returned for Auth Items created via Database Insights. Note: Database Insights is currently a beta feature, please contact your account manager for more information.  `database_insights_fail`:  The Item\'s numbers have been verified using Plaid\'s data sources and have signal for being invalid and/or have no signal for being valid. Only returned for Auth Items created via Database Insights. Note: Database Insights is currently a beta feature, please contact your account manager for more information.
   * @type {string}
   * @memberof AccountBase
   */
  verification_status?: AccountBaseVerificationStatusEnum;
  /**
   *
   * @type {AccountVerificationInsights}
   * @memberof AccountBase
   */
  verification_insights?: AccountVerificationInsights;
  /**
   * A unique and persistent identifier for accounts that can be used to trace multiple instances of the same account across different Items for depository accounts. This field is currently supported only for Items at institutions that use Tokenized Account Numbers (i.e., Chase and PNC). Because these accounts have a different account number each time they are linked, this field may be used instead of the account number to uniquely identify an account across multiple Items for payments use cases, helping to reduce duplicate Items or attempted fraud. In Sandbox, this field may be populated for any account; in Production, it will only be populated for accounts at applicable institutions.
   * @type {string}
   * @memberof AccountBase
   */
  persistent_account_id?: string;
  /**
   *
   * @type {AccountHolderCategory}
   * @memberof AccountBase
   */
  holder_category?: AccountHolderCategory | null;

  /**
   * The Item ID associated with the account. This field is only returned if the `include` query parameter is set to `item` in the request.
   */
  item_id?: string | null;
}

export interface Item {
  item_id: string;
  institution_id: string;
  institution_name?: string | null;
  webhook?: string | null;
  error: PlaidError | null;
  available_products?: Array<Products>;
  billed_products?: Array<Products>;
  products?: Array<Products>;
  consented_products?: Array<Products>;
  request_id?: string | null;
  update_type?: string | null;
  consent_expiration_time?: string | null;
  accountId?: string | null;
  account?: Account | null;
  access_token?: string | null;
  update_time?: ItemUpdateTypeEnum;
}

export interface Holding {
  user_id?: string;
  account_id?: string;
  holding_id?: string;
  cost_basis?: number | null | Decimal;
  annual_return_rate?: number | null | Decimal;
  annual_inflation_rate?: number | null | Decimal;
  institution_price?: number | Decimal;
  institution_price_as_of?: string | null | Date;
  institution_price_datetime?: string | null | Date;
  institution_value?: number | Decimal | null;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
  vested_quantity?: number | Decimal | null;
  vested_value?: number | Decimal | null;
  quantity?: number | Decimal;
  security_id?: string;
  security?: Security;
  timestamp?: Date | null;
  securities?: Security[];
}

export interface HoldingId {
  security_id: string;
  user_id: string;
  account_id: string;
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
  close_price: number | Decimal | null;
  close_price_as_of: string | null | Date;
  update_datetime?: string | null | Date;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
  market_identifier_code?: string | null;
  sector?: string | null;
  industry?: string | null;
  timestamp?: Date | null;
  option_contract?: {
    contract_type: "put" | "call";
    expiration_date: string;
    strike_price: number | Decimal;
    underlying_security_ticker: string;
  } | null;
  fixed_income?: {
    yield_rate?: {
      percentage?: number | Decimal;
      type?: "coupon" | "coupon_equivalent" | "discount" | "yield" | null;
    } | null;
    maturity_date?: string | null;
    issue_date?: string | null;
    face_value?: number | Decimal | null;
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


// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
export interface LinkProps {
  linkToken: string | null;
}