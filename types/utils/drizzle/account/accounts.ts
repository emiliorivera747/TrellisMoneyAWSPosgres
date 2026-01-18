import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export interface AddAccountsParams {
  itemId: string;
  plaidAccounts: PlaidLinkOnSuccessMetadata["accounts"];
  householdMemberId: string;
}
