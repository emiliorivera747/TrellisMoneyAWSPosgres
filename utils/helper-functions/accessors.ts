import { SecurityData } from '@/types/dashboardComponents';
export const getDate = (d: SecurityData) => new Date(d?.date);
export const getStockValue = (d: SecurityData) => d?.close;