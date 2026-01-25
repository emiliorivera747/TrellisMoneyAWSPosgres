export interface NetWorthData {
  date: Date;
  value: number;
}

export interface ProjectedNetworth {
  data: NetWorthData[];
  value: string;
}
