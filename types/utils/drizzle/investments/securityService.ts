import { Security } from "plaid";

export interface UpsertSecuritiesParams {
  securitiesPlaid: Security[];
  timestamp: string;
}
