export type AggregateHoldingDetails = {
  tickerSymbol: string;
  securityName: string;
  totalValue: string;
  averageCost: string;
  totalReturn: string;
  shares: string;
  holdings: [
    {
      holdingId: string;
      account: { name: string };
      member: { name: string };
      shares: number;
      totalValue: number;
      averageCost: number;
      totalReturn: number;
      updatedAt: Date;
    }
  ];
};

export type DetailedHolding = {
  holdingId: string;
  account: { name: string };
  member: { name: string };
  shares: number;
  totalValue: number;
  averageCost: number;
  totalReturn: number;
  updatedAt: Date;
};
