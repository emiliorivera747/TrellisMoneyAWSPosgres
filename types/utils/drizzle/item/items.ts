import { ItemPublicTokenExchangeResponse } from "plaid";
export type AddItemProps = {
  userId: string;
  memberId: string;
  householdId: string;
  plaidItem: ItemPublicTokenExchangeResponse;
};
