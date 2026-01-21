import { Security } from "plaid";

export interface UpsertSecuritiesParams {
  tx: any;
  plaidSecurities: Security[];
  timestamp?: string;
}
