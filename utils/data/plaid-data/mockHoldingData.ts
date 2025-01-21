import { Holding, Security } from "@/types/plaid";

const holdingData: Holding[] = [
  {
    account_id: "JqMLm4rJwpF6gMPJwBqdh9ZjjPvvpDcb7kDK1",
    cost_basis: 1,
    institution_price: 1,
    institution_price_as_of: "2021-04-13",
    institution_price_datetime: null,
    institution_value: 0.01,
    iso_currency_code: "USD",
    quantity: 33,
    security_id: "d6ePmbPxgWCWmMVv66q9iPV94n91vMtov5Are",
    unofficial_currency_code: null,
    annual_inflation_rate: 0.1,
  },
  {
    account_id: "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
    cost_basis: 1.5,
    institution_price: 2.11,
    institution_price_as_of: "2021-04-13",
    institution_price_datetime: null,
    institution_value: 2.11,
    iso_currency_code: "USD",
    quantity: 17.52,
    security_id: "KDwjlXj1Rqt58dVvmzRguxJybmyQL8FgeWWAy",
    unofficial_currency_code: null,
    annual_inflation_rate: 0.1,
  },
  {
    account_id: "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
    cost_basis: 10,
    institution_price: 10.42,
    institution_price_as_of: "2021-04-13",
    institution_price_datetime: null,
    institution_value: 20.84,
    iso_currency_code: "USD",
    quantity: 1.01,
    security_id: "NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk",
    unofficial_currency_code: null,
    annual_inflation_rate: 0.1,
  },
  {
    account_id: "JqMLm4rJwpF6gMPJwBqdh9ZjjPvvpDcb7kDK1",
    cost_basis: 0.01,
    institution_price: 0.011,
    institution_price_as_of: "2021-04-13",
    institution_price_datetime: null,
    institution_value: 110,
    iso_currency_code: "USD",
    quantity: 38.15,
    security_id: "8E4L9XLl6MudjEpwPAAgivmdZRdBPJuvMPlPb",
    unofficial_currency_code: null,
  },
  // {
  //   account_id: "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
  //   cost_basis: 23,
  //   institution_price: 27,
  //   institution_price_as_of: "2021-04-13",
  //   institution_price_datetime: null,
  //   institution_value: 636.309,
  //   iso_currency_code: "USD",
  //   quantity: 23.567,
  //   security_id: "JDdP7XPMklt5vwPmDN45t3KAoWAPmjtpaW7DP",
  //   unofficial_currency_code: null,
  // },
  // {
  //   account_id: "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
  //   cost_basis: 15,
  //   institution_price: 13.73,
  //   institution_price_as_of: "2021-04-13",
  //   institution_price_datetime: null,
  //   institution_value: 1373.6865,
  //   iso_currency_code: "USD",
  //   quantity: 100.05,
  //   security_id: "nnmo8doZ4lfKNEDe3mPJipLGkaGw3jfPrpxoN",
  //   unofficial_currency_code: null,
  // },
  // {
  //   account_id: "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
  //   cost_basis: 948.08,
  //   institution_price: 94.808,
  //   institution_price_as_of: "2021-04-13",
  //   institution_price_datetime: null,
  //   institution_value: 948.08,
  //   iso_currency_code: "USD",
  //   quantity: 10,
  //   security_id: "Lxe4yz4XQEtwb2YArO7RFMpPDvPxy7FALRyea",
  //   unofficial_currency_code: null,
  // },
  // {
  //   account_id: "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
  //   cost_basis: 1,
  //   institution_price: 1,
  //   institution_price_as_of: "2021-04-13",
  //   institution_price_datetime: null,
  //   institution_value: 12345.67,
  //   iso_currency_code: "USD",
  //   quantity: 12345.67,
  //   security_id: "d6ePmbPxgWCWmMVv66q9iPV94n91vMtov5Are",
  //   unofficial_currency_code: null,
  // },
  // {
  //   account_id: "ax0xgOBYRAIqOOjeLZr0iZBb8r6K88HZXpvmq",
  //   cost_basis: 92.47,
  //   institution_price: 0.177494362,
  //   institution_price_as_of: "2022-01-14",
  //   institution_price_datetime: "2022-06-07T23:01:00Z",
  //   institution_value: 4437.35905,
  //   iso_currency_code: "USD",
  //   quantity: 25000,
  //   security_id: "vLRMV3MvY1FYNP91on35CJD5QN5rw9Fpa9qOL",
  //   unofficial_currency_code: null,
  // },
];

const securitiesData: Security[] = [
  {
    close_price: 24.24,
    close_price_as_of: "2021-04-13",
    cusip: null,
    institution_id: null,
    institution_security_id: null,
    is_cash_equivalent: false,
    isin: null,
    iso_currency_code: "USD",
    name: "RKLB",
    proxy_security_id: null,
    security_id: "8E4L9XLl6MudjEpwPAAgivmdZRdBPJuvMPlPb",
    sedol: null,
    ticker_symbol: "NFLX180201C00355000",
    type: "derivative",
    unofficial_currency_code: null,
    update_datetime: null,
    market_identifier_code: "XNAS",
    sector: "Techn18ology Services",
    industry: "Internet Software or Services",

    option_contract: {
      contract_type: "call",
      expiration_date: "2018-02-01",
      strike_price: 355,
      underlying_security_ticker: "NFLX",
    },
    fixed_income: null,
  },
  {
    close_price: 27,
    close_price_as_of: null,
    cusip: "577130834",
    institution_id: null,
    institution_security_id: null,
    is_cash_equivalent: false,
    isin: "US5771308344",
    iso_currency_code: "USD",
    name: "Matthews Pacific Tiger Fund Insti Class",
    proxy_security_id: null,
    security_id: "JDdP7XPMklt5vwPmDN45t3KAoWAPmjtpaW7DP",
    sedol: null,
    ticker_symbol: "MIPTX",
    type: "mutual fund",
    unofficial_currency_code: null,
    update_datetime: null,
    market_identifier_code: "XNAS",
    sector: "Miscellaneous",
    industry: "Investment Trusts or Mutual Funds",
    option_contract: null,
    fixed_income: null,
  },
  {
    close_price: 63.63,
    close_price_as_of: null,
    cusip: "00448Q201",
    institution_id: null,
    institution_security_id: null,
    is_cash_equivalent: false,
    isin: "US00448Q2012",
    iso_currency_code: "USD",
    name: "KO",
    proxy_security_id: null,
    security_id: "KDwjlXj1Rqt58dVvmzRguxJybmyQL8FgeWWAy",
    sedol: null,
    ticker_symbol: "KO",
    type: "equity",
    unofficial_currency_code: null,
    update_datetime: null,
    market_identifier_code: "XNAS",
    sector: "Health Technology",
    industry: "Major Pharmaceuticals",
    option_contract: null,
    fixed_income: null,
  },
  {
    close_price: 549.71,
    close_price_as_of: null,
    cusip: "258620103",
    institution_id: null,
    institution_security_id: null,
    is_cash_equivalent: false,
    isin: "US2586201038",
    iso_currency_code: "USD",
    name: "VOO",
    proxy_security_id: null,
    security_id: "NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk",
    sedol: null,
    ticker_symbol: "VOO",
    type: "mutual fund",
    unofficial_currency_code: null,
    update_datetime: null,
    market_identifier_code: "XNAS",
    sector: null,
    industry: null,
    option_contract: null,
    fixed_income: null,
  },
  {
    close_price: 427,
    close_price_as_of: null,
    cusip: null,
    institution_id: null,
    institution_security_id: null,
    is_cash_equivalent: true,
    isin: null,
    iso_currency_code: "USD",
    name: "TSLA",
    proxy_security_id: null,
    security_id: "d6ePmbPxgWCWmMVv66q9iPV94n91vMtov5Are",
    sedol: null,
    ticker_symbol: "TSLA",
    type: "cash",
    unofficial_currency_code: null,
    update_datetime: null,
    market_identifier_code: null,
    sector: null,
    industry: null,
    option_contract: null,
    fixed_income: null,
  },
  {
    close_price: 13.73,
    close_price_as_of: null,
    cusip: null,
    institution_id: "ins_3",
    institution_security_id: "NHX105509",
    is_cash_equivalent: false,
    isin: null,
    iso_currency_code: "USD",
    name: "NH PORTFOLIO 1055 (FIDELITY INDEX)",
    proxy_security_id: null,
    security_id: "nnmo8doZ4lfKNEDe3mPJipLGkaGw3jfPrpxoN",
    sedol: null,
    ticker_symbol: "NHX105509",
    type: "etf",
    unofficial_currency_code: null,
    update_datetime: null,
    market_identifier_code: "XNAS",
    sector: null,
    industry: null,
    option_contract: null,
    fixed_income: null,
  },
  {
    close_price: 94.808,
    close_price_as_of: "2023-11-02",
    cusip: "912797HE0",
    institution_id: null,
    institution_security_id: null,
    is_cash_equivalent: false,
    isin: null,
    iso_currency_code: "USD",
    name: "US Treasury Bill - 5.43% 31/10/2024 USD 100",
    proxy_security_id: null,
    security_id: "Lxe4yz4XQEtwb2YArO7RFMpPDvPxy7FALRyea",
    sedol: null,
    ticker_symbol: null,
    type: "fixed income",
    unofficial_currency_code: null,
    update_datetime: null,
    market_identifier_code: null,
    sector: "Government",
    industry: "Sovereign Government",
    option_contract: null,
    fixed_income: {
      face_value: 100,
      issue_date: "2023-11-02",
      maturity_date: "2024-10-31",
      yield_rate: {
        percentage: 5.43,
        type: "coupon_equivalent",
      },
    },
  },
  {
    close_price: 0.140034616,
    close_price_as_of: "2022-01-24",
    cusip: null,
    institution_id: "ins_3",
    institution_security_id: null,
    is_cash_equivalent: true,
    isin: null,
    iso_currency_code: "USD",
    name: "Dogecoin",
    proxy_security_id: null,
    security_id: "vLRMV3MvY1FYNP91on35CJD5QN5rw9Fpa9qOL",
    sedol: null,
    ticker_symbol: "DOGE",
    type: "cryptocurrency",
    unofficial_currency_code: null,
    update_datetime: "2022-06-07T23:01:00Z",
    market_identifier_code: "XNAS",
    sector: null,
    industry: null,
    option_contract: null,
    fixed_income: null,
  },
];

export const mockHoldingData = {
  accounts: [
    {
      account_id: "5Bvpj4QknlhVWk7GygpwfVKdd133GoCxB814g",
      balances: {
        available: 43200,
        current: 43200,
        iso_currency_code: "USD",
        limit: null,
        unofficial_currency_code: null,
      },
      mask: "4444",
      name: "Robinhood Money Market",
      official_name: "Robinhood",
      subtype: "money market",
      type: "depository",
    },
    {
      account_id: "JqMLm4rJwpF6gMPJwBqdh9ZjjPvvpDcb7kDK1",
      balances: {
        available: null,
        current: 110.01,
        iso_currency_code: "USD",
        limit: null,
        unofficial_currency_code: null,
      },
      mask: "5555",
      name: "Robinhood IRA",
      official_name: null,
      subtype: "ira",
      type: "investment",
    },
    {
      account_id: "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
      balances: {
        available: null,
        current: 24580.0605,
        iso_currency_code: "USD",
        limit: null,
        unofficial_currency_code: null,
      },
      mask: "6666",
      name: "Plaid 401k",
      official_name: null,
      subtype: "401k",
      type: "investment",
    },
    {
      account_id: "ax0xgOBYRAIqOOjeLZr0iZBb8r6K88HZXpvmq",
      balances: {
        available: 48200.03,
        current: 48200.03,
        iso_currency_code: "USD",
        limit: null,
        unofficial_currency_code: null,
      },
      mask: "4092",
      name: "Coinbase Crypto Exchange Account",
      official_name: null,
      subtype: "crypto exchange",
      type: "investment",
    },
  ],
  holdings: holdingData,
  item: {
    available_products: ["balance", "identity", "liabilities", "transactions"],
    billed_products: ["assets", "auth", "investments"],
    consent_expiration_time: null,
    error: null,
    institution_id: "ins_3",
    institution_name: "Chase",
    item_id: "4z9LPae1nRHWy8pvg9jrsgbRP4ZNQvIdbLq7g",
    update_type: "background",
    webhook: "https://www.genericwebhookurl.com/webhook",
    auth_method: "INSTANT_AUTH",
  },
  request_id: "l68wb8zpS0hqmsJ",
  securities: securitiesData,
};
