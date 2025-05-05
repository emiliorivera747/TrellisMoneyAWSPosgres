'use client'

import React from "react";

// Link
import Link from "@/features/plaid/components/Link";

// Hooks
import useGenerateToken from "@/hooks/plaid/useGenerateToken";

/**
 *
 * Responsible for adding a connection to plaid
 *
 * @returns
 */
const AddConnection = () => {
  const linkToken = useGenerateToken();
  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 6px 16px",
      }}
      className="py-6 border border-tertiary-400 px-4 w-[18rem] flex flex-col items-center justify-center rounded-[12px] bg-white h-[10rem]"
    >
      <h1 className="text-[1rem] text-tertiary-900 pb-4 font-semibold ">Add Connection</h1>
      <Link linkToken={linkToken} />
    </div>
  );
};

export default AddConnection;
