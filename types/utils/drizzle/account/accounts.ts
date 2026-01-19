import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export interface AddAccountsParams {
  itemId: string;
  plaidAccountsMetadata: PlaidLinkOnSuccessMetadata["accounts"];
  householdMemberId: string;
}
