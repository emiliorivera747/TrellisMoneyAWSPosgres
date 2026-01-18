import { ItemPublicTokenExchangeResponse } from "plaid";


export type AddItemProps = {
  userId: string;
  plaidItem: ItemPublicTokenExchangeResponse;
};

