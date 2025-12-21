import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

interface Institution {
  institution_id: string;
  name: string;
}

interface Account {
  mask: string;
  name: string;
}

export interface ExchangeTokenProps {
  public_token: string;
  metadata: PlaidLinkOnSuccessMetadata;
  user_id: string;
}
