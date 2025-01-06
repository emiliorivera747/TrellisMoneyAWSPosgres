import { SecurityData } from '@/features/projected-net-worth/types/graphComponents';
export const getDate: (d: SecurityData) => Date = (d: SecurityData) => d?.date;
export const getStockValue = (d: SecurityData) => d?.close;