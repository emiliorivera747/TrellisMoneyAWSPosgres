import { Decimal } from "decimal.js";

export interface SecurityHistory {
  security_id: string;
  close_price: number | Decimal;
  close_price_as_of: string | null | Date;
  update_datetime: string | null | Date;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
}

export interface HoldingHistory {
  security_id: string;
  account_id: string;
  user_id: string;
  quantity: number | Decimal;
  cost_basis: number | Decimal;
  annual_return_rate: number |  Decimal;
  annual_inflation_rate: number | null | Decimal;
  institution_price: number | Decimal;
  institution_price_as_of: string | Date;
  institution_price_datetime: string | Date;
  institution_value: number | Decimal ;
  vested_value: number | Decimal;
  iso_currency_code: string ;
}

