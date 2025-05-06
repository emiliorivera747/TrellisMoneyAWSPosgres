import { GroupedAccounts } from "@/types/plaid";

export interface UseAccountsResponse {
  filter: string;
  startDate: Date;
  endDate: Date;
  groups: GroupedAccounts;
  itemIsPending: boolean;
  itemHasError: boolean;
  mutateItem: (itemId: string) => void;
  handleFilterChange: (newFilter: string) => void;
  handleStartDateChange: (newStartData: Date) => void;
  handleEndDateChange: (newEndData: Date) => void;
  handleDateFilterChange: (newStartData: Date, newEndData: Date) => void;
  accountsResponse: any;
  isLoadingAccounts: boolean;
  isErrorAccounts: boolean;
}
