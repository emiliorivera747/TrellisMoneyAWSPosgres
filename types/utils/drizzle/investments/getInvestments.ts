import {
  Holding as HoldingDB,
  Account as AccountDB,
} from "@/drizzle/schema/index";
import { Holding as plaidHolding, Security as plaidSecurity } from "plaid";

export interface UpdateHoldingsAndSecuritiesParams {
  holdingsPlaid: plaidHolding[];
  holdingsDB: HoldingDB[];
  securitiesPlaid: plaidSecurity[];
  accountsDB: AccountDB[];
  userId: string;
  timestamp: string;
}

export interface UpsertHoldingsParams {
  holdingsPlaid: plaidHolding[];
  timestamp: string;
  holdingMap: Map<string, { householdMemberId: string; holdingId: string }>;
}
