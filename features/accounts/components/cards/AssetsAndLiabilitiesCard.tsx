"use client";

// React
import { useMemo } from "react";

// Hooks
import { useFetchAccounts } from "@/features/accounts/hooks/useFetchAccounts";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import NetValueDisplayCardSkeleton from "@/components/skeletons/dashboard/NetValueDisplayCardSkeleton";

// Types
import { Account } from "@/drizzle/schema";

// Utils
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

const ASSET_TYPES = ["DEPOSITORY", "INVESTMENT", "OTHER"];
const LIABILITY_TYPES = ["CREDIT", "LOAN"];

const GroupHeader = ({ label }: { label: string }) => (
  <TableRow className="text-[0.9rem] border-b border-t border-tertiary-300 text-tertiary-800 hover:bg-white h-[3.5rem] font-light">
    <TableCell className="pl-6 text-tertiary-1000 font-bold">{label}</TableCell>
    <TableCell className="text-[0.75rem]">Balance</TableCell>
  </TableRow>
);

const AccountRow = ({ account }: { account: Account }) => (
  <TableRow className="border-none hover:bg-tertiary-100 cursor-pointer h-[4.5rem]">
    <TableCell className="pl-6 text-[0.8rem] w-[14rem]">
      <div className="flex flex-col text-tertiary-1000 font-bold">
        <span className="font-bold text-[0.7rem] uppercase truncate max-w-[14rem]">
          {account.accountName.substring(0, 20)}
          {account.accountName.length > 20 ? "..." : ""}
        </span>
        <span className="font-normal text-tertiary-600 text-[0.7rem]">
          {account.subtype ?? account.type}
        </span>
      </div>
    </TableCell>
    <TableCell className="text-secondary-1000 text-start text-[0.85rem] font-semibold overflow-x-auto h-[4.5rem]">
      {convertToMoney(Number(account.currentBalance))}
    </TableCell>
  </TableRow>
);

const AssetsAndLiabilitiesCard = () => {
  const { accountsResponse, isLoadingAccounts } = useFetchAccounts();
  const accounts = accountsResponse?.data?.accounts;

  const { assets, liabilities } = useMemo(() => {
    if (!accounts) return { assets: [], liabilities: [] };

    const assets: Account[] = [];
    const liabilities: Account[] = [];

    accounts.forEach((account: Account) => {
      if (ASSET_TYPES.includes(account.type)) assets.push(account);
      else if (LIABILITY_TYPES.includes(account.type)) liabilities.push(account);
    });

    return { assets, liabilities };
  }, [accounts]);

  if (isLoadingAccounts) return <NetValueDisplayCardSkeleton />;

  return (
    <div className="grid grid-rows-[4rem_1fr] no-scrollbars rounded-[12px] pb-6 border border-tertiary-400 w-full text-[#343a40] max-h-[90vh] overflow-y-auto">
      <div className="font-bold text-foreground flex items-center h-[4rem] px-6">
        <span className="text-sm tracking-wider">Assets &amp; Liabilities</span>
      </div>
      <Table>
        <TableBody>
          <GroupHeader label="Assets" />
          {assets.length > 0 ? (
            assets.map((account) => (
              <AccountRow key={account.accountId} account={account} />
            ))
          ) : (
            <TableRow>
              <TableCell className="pl-6 text-xs text-tertiary-500 py-2">No assets found</TableCell>
            </TableRow>
          )}
          <GroupHeader label="Liabilities" />
          {liabilities.length > 0 ? (
            liabilities.map((account) => (
              <AccountRow key={account.accountId} account={account} />
            ))
          ) : (
            <TableRow>
              <TableCell className="pl-6 text-xs text-tertiary-500 py-2">No liabilities found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetsAndLiabilitiesCard;
