import { SecurityData } from '@/types/dashboardComponents';
export const getDate = (d: SecurityData) => new Date(d.year, 0, 1);
export const getStockValue = (d: SecurityData) => d?.close;