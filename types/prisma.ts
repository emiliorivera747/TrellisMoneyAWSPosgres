import { Prisma } from "@/app/generated/prisma/client";
import {
  Security,
  Household,
  Account,
  Holding,
  User,
  Item, 
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


export type ItemWithMembers = Prisma.ItemGetPayload<{
  include: { 
    member: true 
  }
}>