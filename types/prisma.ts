import { Decimal } from "decimal.js";

export interface SecurityHistory {
  security_id: string;
  close_price: number | Decimal;
  close_price_as_of: string | null | Date;
  update_datetime: string | null | Date;
  iso_currency_code?: string | null;
  unofficial_currency_code?: string | null;
}
