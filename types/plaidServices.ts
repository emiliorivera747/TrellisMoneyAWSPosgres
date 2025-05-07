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
  institution: Institution;
  accounts: Account[];
}
