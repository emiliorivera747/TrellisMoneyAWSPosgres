import { SecurityData } from '@/types/dashboardComponents';
export const getDate: (d: SecurityData) => Date = (d: SecurityData) => d?.year;
export const getStockValue = (d: SecurityData) => d?.close;