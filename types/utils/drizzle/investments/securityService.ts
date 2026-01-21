import { Security } from "plaid";

export interface UpsertSecuritiesParams {
  tx: any;
  securitiesPlaid: Security[];
  timestamp?: string;
}
