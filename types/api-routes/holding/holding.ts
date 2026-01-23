export type AggregateHoldingDetails = {
  tickerSymbol: string;
  securityName: string;
  totalValue: number;
  averageCost: number;
  totalReturn: number | null;
  shares: number;
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
