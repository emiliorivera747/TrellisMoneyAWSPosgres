import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export interface ExchangeTokenProps {
  public_token: string;
  metadata: PlaidLinkOnSuccessMetadata;
  member_id: string;
}
