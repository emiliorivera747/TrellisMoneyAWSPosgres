export interface NetWorthData {
  date: Date;
  close: number;
}

export interface ProjectedNetworth {
  data: NetWorthData[];
  close: string;
}
