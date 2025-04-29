"use client";

import React from "react";

import AccountContent from "@/features/accounts/components/AccountContent";

import { AccountsProvider } from "@/context/accounts/AccountContext";

const page = () => {
  return (
    <AccountsProvider>
      <AccountContent />
    </AccountsProvider>
  );
};

export default page;
