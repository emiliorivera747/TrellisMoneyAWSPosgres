import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export interface AddAccountsParams {
  itemId: string;
  plaidAccounts: PlaidLinkOnSuccessMetadata["accounts"];
  householdId: string;
  memberId: string;
}
