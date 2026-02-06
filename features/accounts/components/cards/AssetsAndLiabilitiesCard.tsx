"use client";

// React
import { useMemo } from "react";

// Hooks
import { useFetchAccounts } from "@/features/accounts/hooks/useFetchAccounts";

// Types
import { Account } from "@/drizzle/schema";

// Utils
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

const ASSET_TYPES = ["DEPOSITORY", "INVESTMENT", "OTHER"];
const LIABILITY_TYPES = ["CREDIT", "LOAN"];

const formatSubtype = (subtype: string | null): string => {
  if (!subtype) return "";
  return subtype
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const AssetsAndLiabilitiesCard = () => {
  const { accountsResponse, isLoadingAccounts } = useFetchAccounts();
  const accounts = accountsResponse?.data?.accounts;

  const { assets, liabilities, totalAssets, totalLiabilities } = useMemo(() => {
    if (!accounts) {
      return {
        assets: [],
        liabilities: [],
        totalAssets: 0,
        totalLiabilities: 0,
      };
    }

    const assets: Account[] = [];
    const liabilities: Account[] = [];
    let totalAssets = 0;
    let totalLiabilities = 0;

    accounts.forEach((account) => {
      const { type, currentBalance } = account;
      const balance = Number(currentBalance) || 0;

      if (ASSET_TYPES.includes(type)) {
        assets.push(account);
        totalAssets += balance;
      } else if (LIABILITY_TYPES.includes(type)) {
        liabilities.push(account);
        totalLiabilities += balance;
      }
    });

    return { assets, liabilities, totalAssets, totalLiabilities };
  }, [accounts]);

  return (
    <div className="w-[23rem] border border-tertiary-400 rounded-[12px] p-4 pb-6 text-[#343a40] no-scrollbars overflow-y-hidden">
      <h2 className="font-bold text-foreground text-sm tracking-wider mb-4">
        Assets & Liabilities
      </h2>

      {isLoadingAccounts ? (
        <div className="text-tertiary-600 text-sm">Loading...</div>
      ) : (
        <>
          {/* Assets Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-tertiary-800">
                Assets
              </span>
              <span className="text-sm font-semibold text-green-600">
                {convertToMoney(totalAssets)}
              </span>
            </div>
            <div className="space-y-2">
              {assets.length > 0 ? (
                assets.map((account) => (
                  <div
                    key={account.accountId}
                    className="flex justify-between items-center py-2 px-3 bg-tertiary-50 rounded-lg"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-tertiary-900 truncate max-w-[120px]">
                        {formatSubtype(account.subtype) ||
                          account.accountName}
                      </span>
                      <span className="text-[10px] text-tertiary-500">
                        {account.accountName}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-tertiary-800">
                      {convertToMoney(Number(account.currentBalance))}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-tertiary-500 py-2">
                  No assets found
                </div>
              )}
            </div>
          </div>

          {/* Liabilities Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-tertiary-800">
                Liabilities
              </span>
              <span className="text-sm font-semibold text-red-600">
                {convertToMoney(totalLiabilities)}
              </span>
            </div>
            <div className="space-y-2">
              {liabilities.length > 0 ? (
                liabilities.map((account) => (
                  <div
                    key={account.accountId}
                    className="flex justify-between items-center py-2 px-3 bg-tertiary-50 rounded-lg"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-tertiary-900 truncate max-w-[120px]">
                        {formatSubtype(account.subtype) ||
                          account.accountName}
                      </span>
                      <span className="text-[10px] text-tertiary-500">
                        {account.accountName}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-tertiary-800">
                      {convertToMoney(Number(account.currentBalance))}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-tertiary-500 py-2">
                  No liabilities found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetsAndLiabilitiesCard;
