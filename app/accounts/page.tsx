"use client";

import AccountContent from "@/features/accounts/components/AccountContent";

import { AccountsProvider } from "@/context/accounts/AccountContext";

/**
 *  Displays the account page and include content
 */
const page = () => {
  return (
    <AccountsProvider>
      <AccountContent />
    </AccountsProvider>
  );
};

export default page;
