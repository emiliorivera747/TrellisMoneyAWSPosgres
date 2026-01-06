import {
  Security,
  Household,
  Account,
  Holding,
} from "@/app/generated/prisma/client";
export interface HoldingWithSecurityExpanded extends Holding {
  security: Security;
}
export interface AccountWithHoldingExpanded extends Account {
  holdings: HoldingWithSecurityExpanded[];
}
export interface HouseholdWithAccountsExpanded extends Household {
  accounts: AccountWithHoldingExpanded[];
}
