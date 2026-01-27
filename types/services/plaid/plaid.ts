import { Decimal } from "decimal.js";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

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
/**
 * Represents a user profile.
 * @export
 * @interface Profile
 */
export interface Profile {
  /**
   * The profile ID.
   * @type {number}
   * @memberof Profile
   */
  id: number;
  /**
   * The profile bio.
   * @type {string}
   * @memberof Profile
   */
  bio?: string;
  /**
   * The user ID associated with the profile.
   * @type {string}
   * @memberof Profile
   */
  userId: string;
  /**
   * The user associated with the profile.
   * @type {User}
   * @memberof Profile
   */
  user: User;
}

/**
 * Represents a user.
 * @export
 * @interface User
 */
export interface User {
  /**
   * The user ID.
   * @type {number}
   * @memberof User
   */
  id: number;
  /**
   * The user's email address.
   * @type {string}
   * @memberof User
   */
  email: string;
  /**
   * The user's name.
   * @type {string}
   * @memberof User
   */
  name?: string;
  /**
   * The date the user was created.
   * @type {Date}
   * @memberof User
   */
  created_at: Date;
  /**
   * The date the user was last updated.
   * @type {Date}
   * @memberof User
   */
  updated_at: Date;
  /**
   * The user ID string.
   * @type {string}
   * @memberof User
   */
  user_id?: string;
  /**
   * Whether the email is verified.
   * @type {boolean}
   * @memberof User
   */
  email_verified?: boolean;
  /**
   * Whether the phone is verified.
   * @type {boolean}
   * @memberof User
   */
  phone_verified?: boolean;
  /**
   * The user's phone number.
   * @type {string}
   * @memberof User
   */
  phone?: string;
  /**
   * The user's accounts.
   * @type {Account[]}
   * @memberof User
   */
  accounts: Account[];
  /**
   * The user's profile.
   * @type {Profile}
   * @memberof User
   */
  profile?: Profile;
}

/**
 * Represents an account balance.
 * @export
 * @interface Balance
 */
export interface Balance {
  /**
   * The available balance.
   * @type {number | null | Decimal}
   * @memberof Balance
   */
  available?: number | null | Decimal;
  /**
   * The current balance.
   * @type {number | null | Decimal}
   * @memberof Balance
   */
  current?: number | null | Decimal;
  /**
   * The credit limit.
   * @type {number | null | Decimal}
   * @memberof Balance
   */
  limit?: number | null | Decimal;
  /**
   * The ISO currency code.
   * @type {string | null}
   * @memberof Balance
   */
  iso_currency_code?: string | null;
  /**
   * The unofficial currency code.
   * @type {string | null}
   * @memberof Balance
   */
  unofficial_currency_code?: string | null;
  /**
   * The last updated datetime.
   * @type {string | null}
   * @memberof Balance
   */
  last_updated_datetime?: string | null;
  /**
   * The timestamp.
   * @type {Date}
   * @memberof Balance
   */
  timestamp?: Date;
}

/**
 * Represents network status information.
 * @export
 * @interface network_status
 */
export interface network_status {
  /**
   * Whether numbers match.
   * @type {boolean}
   * @memberof network_status
   */
  has_numbers_match: boolean;
  /**
   * Whether numbers match is verified.
   * @type {boolean}
   * @memberof network_status
   */
  is_numbers_match_verified: boolean;
}

/**
 * Represents previous returns information.
 * @export
 * @interface previous_returns
 */
export interface previous_returns {
  /**
   * Whether there are previous administrative returns.
   * @type {boolean}
   * @memberof previous_returns
   */
  has_previous_administrative_returns: boolean;
}

/**
 * Represents verification insights.
 * @export
 * @interface verification_insights
 */
export interface verification_insights {
  /**
   * The network status.
   * @type {network_status}
   * @memberof verification_insights
   */
  network_status: network_status;
  /**
   * The previous returns information.
   * @type {previous_returns}
   * @memberof verification_insights
   */
  previous_returns: previous_returns;
  /**
   * The account number format.
   * @type {string}
   * @memberof verification_insights
   */
  account_number_format: string;
}

/**
 * Represents an account.
 * @export
 * @interface Account
 */
export interface Account {
  /**
   * The account ID.
   * @type {string}
   * @memberof Account
   */
  account_id: string;
  /**
   * The account balance.
   * @type {Balance}
   * @memberof Account
   */
  balance?: Balance;
  /**
   * The account mask.
   * @type {string | undefined | null}
   * @memberof Account
   */
  mask?: string | undefined | null;
  /**
   * The official account name.
   * @type {string | undefined | null}
   * @memberof Account
   */
  official_name?: string | undefined | null;
  /**
   * The account subtype.
   * @type {string | undefined | null}
   * @memberof Account
   */
  subtype: string | undefined | null;
  /**
   * The verification status.
   * @type {string | undefined | null}
   * @memberof Account
   */
  verification_status?: string | undefined | null;
  /**
   * The expected annual return rate.
   * @type {number | null | Decimal}
   * @memberof Account
   */
  expected_annual_return_rate?: number | null | Decimal;
  /**
   * The current balance.
   * @type {number | null | Decimal}
   * @memberof Account
   */
  current?: number | null | Decimal;
  /**
   * The account name.
   * @type {string | null}
   * @memberof Account
   */
  name: string | null;
  /**
   * The account type.
   * @type {string | null}
   * @memberof Account
   */
  type: string | null;
  /**
   * The associated item.
   * @type {Item}
   * @memberof Account
   */
  items?: Item;
  /**
   * The account owners.
   * @type {Owner[]}
   * @memberof Account
   */
  owners?: Owner[];
  /**
   * The user ID.
   * @type {string}
   * @memberof Account
   */
  user_id?: string;
  /**
   * The item ID.
   * @type {string | undefined | null}
   * @memberof Account
   */
  item_id?: string | undefined | null;
  /**
   * The owner ID.
   * @type {string}
   * @memberof Account
   */
  owner_id?: string;
  /**
   * The user associated with the account.
   * @type {User}
   * @memberof Account
   */
  User?: User;
  /**
   * The timestamp.
   * @type {Date | undefined | null}
   * @memberof Account
   */
  timestamp?: Date | undefined | null;
  /**
   * The verification insights.
   * @type {verification_insights | null | undefined}
   * @memberof Account
   */
  verification_insights?: verification_insights | null | undefined;
  /**
   * The persistent account ID.
   * @type {string | undefined | null}
   * @memberof Account
   */
  persistent_account_id?: string | undefined | null;
  /**
   * The holder category.
   * @type {string | undefined | null}
   * @memberof Account
   */
  holder_catergory?: string | undefined | null;
  /**
   * The holdings associated with the account.
   * @type {Holding[]}
   * @memberof Account
   */
  holdings?: Holding[];
}

/**
 * Represents an account base with item ID.
 * @export
 * @interface AccountBaseWithItemId
 */
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

/**
 * Represents a Plaid item.
 * @export
 * @interface Item
 */
export interface Item {
  /**
   * The item ID.
   * @type {string}
   * @memberof Item
   */
  item_id: string;
  /**
   * The institution ID.
   * @type {string}
   * @memberof Item
   */
  institution_id: string;
  /**
   * The institution name.
   * @type {string | null}
   * @memberof Item
   */
  institution_name?: string | null;
  /**
   * The webhook URL.
   * @type {string | null}
   * @memberof Item
   */
  webhook?: string | null;
  /**
   * The Plaid error, if any.
   * @type {PlaidError | null}
   * @memberof Item
   */
  error: PlaidError | null;
  /**
   * The available products.
   * @type {Array<Products>}
   * @memberof Item
   */
  available_products?: Array<Products>;
  /**
   * The billed products.
   * @type {Array<Products>}
   * @memberof Item
   */
  billed_products?: Array<Products>;
  /**
   * The products.
   * @type {Array<Products>}
   * @memberof Item
   */
  products?: Array<Products>;
  /**
   * The consented products.
   * @type {Array<Products>}
   * @memberof Item
   */
  consented_products?: Array<Products>;
  /**
   * The request ID.
   * @type {string | null}
   * @memberof Item
   */
  request_id?: string | null;
  /**
   * The update type.
   * @type {string | null}
   * @memberof Item
   */
  update_type?: string | null;
  /**
   * The consent expiration time.
   * @type {string | null}
   * @memberof Item
   */
  consent_expiration_time?: string | null;
  /**
   * The account ID.
   * @type {string | null}
   * @memberof Item
   */
  accountId?: string | null;
  /**
   * The accounts associated with the item.
   * @type {Account[] | null}
   * @memberof Item
   */
  account?: Account[] | null;
  /**
   * The access token.
   * @type {string | null}
   * @memberof Item
   */
  access_token?: string | null;
  /**
   * The update time.
   * @type {ItemUpdateTypeEnum}
   * @memberof Item
   */
  update_time?: ItemUpdateTypeEnum;
}

/**
 * Represents a holding.
 * @export
 * @interface Holding
 */
export interface Holding {
  /**
   * The user ID.
   * @type {string}
   * @memberof Holding
   */
  user_id?: string;
  /**
   * The account ID.
   * @type {string}
   * @memberof Holding
   */
  account_id?: string;
  /**
   * The holding ID.
   * @type {string}
   * @memberof Holding
   */
  holding_id?: string;
  /**
   * The cost basis.
   * @type {number | null | Decimal}
   * @memberof Holding
   */
  cost_basis?: number | null | Decimal;
  /**
   * The expected annual return rate.
   * @type {number | null | Decimal}
   * @memberof Holding
   */
  expected_annual_return_rate?: number | null | Decimal;
  /**
   * The annual inflation rate.
   * @type {number | null | Decimal}
   * @memberof Holding
   */
  annualInflationRate?: number | null | Decimal;
  /**
   * The institution price.
   * @type {number | Decimal}
   * @memberof Holding
   */
  institution_price?: number | Decimal;
  /**
   * The date the institution price was current.
   * @type {string | null | Date}
   * @memberof Holding
   */
  institution_price_as_of?: string | null | Date;
  /**
   * The datetime the institution price was current.
   * @type {string | null | Date}
   * @memberof Holding
   */
  institution_price_datetime?: string | null | Date;
  /**
   * The institution value.
   * @type {number | Decimal | null}
   * @memberof Holding
   */
  institution_value?: number | Decimal | null;
  /**
   * The ISO currency code.
   * @type {string | null}
   * @memberof Holding
   */
  iso_currency_code?: string | null;
  /**
   * The unofficial currency code.
   * @type {string | null}
   * @memberof Holding
   */
  unofficial_currency_code?: string | null;
  /**
   * The vested quantity.
   * @type {number | Decimal | null}
   * @memberof Holding
   */
  vested_quantity?: number | Decimal | null;
  /**
   * The vested value.
   * @type {number | Decimal | null}
   * @memberof Holding
   */
  vested_value?: number | Decimal | null;
  /**
   * The quantity.
   * @type {number | Decimal}
   * @memberof Holding
   */
  quantity?: number | Decimal;
  /**
   * The security ID.
   * @type {string}
   * @memberof Holding
   */
  security_id?: string;
  /**
   * The security associated with the holding.
   * @type {Security}
   * @memberof Holding
   */
  security?: Security;
  /**
   * The timestamp.
   * @type {Date | null}
   * @memberof Holding
   */
  timestamp?: Date | null;
  /**
   * The securities associated with the holding.
   * @type {Security[]}
   * @memberof Holding
   */
  securities?: Security[];
}

/**
 * Represents a holding ID.
 * @export
 * @interface HoldingId
 */
export interface HoldingId {
  /**
   * The security ID.
   * @type {string}
   * @memberof HoldingId
   */
  security_id: string;
  /**
   * The user ID.
   * @type {string}
   * @memberof HoldingId
   */
  user_id: string;
  /**
   * The account ID.
   * @type {string}
   * @memberof HoldingId
   */
  account_id: string;
}

/**
 * Represents a security.
 * @export
 * @interface Security
 */
export interface Security {
  /**
   * The security ID.
   * @type {string}
   * @memberof Security
   */
  security_id: string;
  /**
   * The ISIN identifier.
   * @type {string | null}
   * @memberof Security
   */
  isin?: string | null;
  /**
   * The CUSIP identifier.
   * @type {string | null}
   * @memberof Security
   */
  cusip?: string | null;
  /**
   * The SEDOL identifier.
   * @type {string | null}
   * @memberof Security
   */
  sedol?: string | null;
  /**
   * The institution security ID.
   * @type {string | null}
   * @memberof Security
   */
  institution_security_id?: string | null;
  /**
   * The institution ID.
   * @type {string | null}
   * @memberof Security
   */
  institution_id?: string | null;
  /**
   * The proxy security ID.
   * @type {string | null}
   * @memberof Security
   */
  proxy_security_id?: string | null;
  /**
   * The security name.
   * @type {string | null}
   * @memberof Security
   */
  name?: string | null;
  /**
   * The ticker symbol.
   * @type {string | null}
   * @memberof Security
   */
  ticker_symbol: string | null;
  /**
   * Whether the security is a cash equivalent.
   * @type {boolean | null}
   * @memberof Security
   */
  is_cash_equivalent?: boolean | null;
  /**
   * The security type.
   * @type {string | null}
   * @memberof Security
   */
  type?: string | null;
  /**
   * The close price.
   * @type {number | Decimal | null}
   * @memberof Security
   */
  close_price: number | Decimal | null;
  /**
   * The date the close price was current.
   * @type {string | null | Date}
   * @memberof Security
   */
  close_price_as_of: string | null | Date;
  /**
   * The update datetime.
   * @type {string | null | Date}
   * @memberof Security
   */
  update_datetime?: string | null | Date;
  /**
   * The ISO currency code.
   * @type {string | null}
   * @memberof Security
   */
  iso_currency_code?: string | null;
  /**
   * The unofficial currency code.
   * @type {string | null}
   * @memberof Security
   */
  unofficial_currency_code?: string | null;
  /**
   * The market identifier code.
   * @type {string | null}
   * @memberof Security
   */
  market_identifier_code?: string | null;
  /**
   * The sector.
   * @type {string | null}
   * @memberof Security
   */
  sector?: string | null;
  /**
   * The industry.
   * @type {string | null}
   * @memberof Security
   */
  industry?: string | null;
  /**
   * The timestamp.
   * @type {Date | null}
   * @memberof Security
   */
  timestamp?: Date | null;
  /**
   * The option contract details, if applicable.
   * @type {{ contract_type: "put" | "call"; expiration_date: string; strike_price: number | Decimal; underlying_security_ticker: string } | null}
   * @memberof Security
   */
  option_contract?: {
    contract_type: "put" | "call";
    expiration_date: string;
    strike_price: number | Decimal;
    underlying_security_ticker: string;
  } | null;
  /**
   * The fixed income details, if applicable.
   * @type {{ yield_rate?: { percentage?: number | Decimal; type?: "coupon" | "coupon_equivalent" | "discount" | "yield" | null } | null; maturity_date?: string | null; issue_date?: string | null; face_value?: number | Decimal | null } | null}
   * @memberof Security
   */
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

/**
 * Represents an account owner.
 * @export
 * @interface Owner
 */
export interface Owner {
  /**
   * The owner ID.
   * @type {string}
   * @memberof Owner
   */
  owner_id: string;
  /**
   * The owner's name.
   * @type {string}
   * @memberof Owner
   */
  name?: string;
  /**
   * The phone number.
   * @type {string}
   * @memberof Owner
   */
  phone_number?: string;
  /**
   * The phone type.
   * @type {string}
   * @memberof Owner
   */
  phone_type?: string;
  /**
   * Whether the phone is primary.
   * @type {boolean}
   * @memberof Owner
   */
  phone_primary?: boolean;
  /**
   * The email address.
   * @type {string}
   * @memberof Owner
   */
  email: string;
  /**
   * The email type.
   * @type {string}
   * @memberof Owner
   */
  email_type?: string;
  /**
   * Whether the email is primary.
   * @type {boolean}
   * @memberof Owner
   */
  email_primary?: boolean;
  /**
   * The street address.
   * @type {string}
   * @memberof Owner
   */
  street?: string;
  /**
   * The region.
   * @type {string}
   * @memberof Owner
   */
  region?: string;
  /**
   * The address.
   * @type {string}
   * @memberof Owner
   */
  address?: string;
  /**
   * The city.
   * @type {string}
   * @memberof Owner
   */
  city?: string;
  /**
   * The state.
   * @type {string}
   * @memberof Owner
   */
  state?: string;
  /**
   * The postal code.
   * @type {string}
   * @memberof Owner
   */
  postal_code?: string;
  /**
   * The country.
   * @type {string}
   * @memberof Owner
   */
  country?: string;
  /**
   * Whether the address is primary.
   * @type {boolean}
   * @memberof Owner
   */
  address_primary?: boolean;
  /**
   * The account ID.
   * @type {string}
   * @memberof Owner
   */
  accountId: string;
  /**
   * The account associated with the owner.
   * @type {Account}
   * @memberof Owner
   */
  account: Account;
  /**
   * The timestamp.
   * @type {Date}
   * @memberof Owner
   */
  timestamp?: Date;
}

/**
 * Represents the properties for the Plaid Link component.
 * Use Plaid Link and pass link token and onSuccess function
 * in configuration to initialize Plaid Link.
 * @export
 * @interface LinkProps
 */
export interface LinkProps {
  /**
   * The link token from Plaid.
   * @type {string | null}
   * @memberof LinkProps
   */
  linkToken: string | null;
  /**
   * A reference to the button element.
   * @type {React.RefObject<HTMLButtonElement>}
   * @memberof LinkProps
   */
  ref?: React.RefObject<HTMLButtonElement>;
  /**
   * Additional CSS class names.
   * @type {string}
   * @memberof LinkProps
   */
  className?: string;
  /**
   * The item ID.
   * @type {string | null}
   * @memberof LinkProps
   */
  itemId?: string | null;
}

/**
 * Represents the request body for exchanging a token.
 * @export
 * @interface ExchangeTokenRequestBody
 */
export interface ExchangeTokenRequestBody {
  /**
   * The public token from Plaid Link.
   * @type {string}
   * @memberof ExchangeTokenRequestBody
   */
  public_token: string;
  /**
   * The metadata from Plaid Link onSuccess callback.
   * @type {PlaidLinkOnSuccessMetadata}
   * @memberof ExchangeTokenRequestBody
   */
  metadata: PlaidLinkOnSuccessMetadata;
  /**
   * The member ID.
   * @type {string}
   * @memberof ExchangeTokenRequestBody
   */
  member_id: string;
}