import { Decimal } from "decimal.js";
import { PlaidError, Products, ItemUpdateTypeEnum, StringFieldUpdateOperationsInput |} from "plaid";
import { Account } from "@/types/plaid";
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
  annual_return_rate: number | Decimal;
  annual_inflation_rate?: number | null | Decimal;
  institution_price: number | Decimal;
  institution_price_as_of: string | Date;
  institution_price_datetime: string | Date;
  institution_value: number | Decimal;
  vested_value: number | Decimal;
  iso_currency_code: string;
}

export interface ItemPrisma {
  item_id: string;
  institution_id?: string | null | undefined;
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
