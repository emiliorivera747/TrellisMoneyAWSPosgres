"use client";

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
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
      }}
      className="border border-tertiary-400  w-[18rem] flex flex-col rounded-[12px] bg-white h-[10rem]"
    >
      <div className="border-b w-full px-6 flex text-center items-center justify-start h-[4rem] ">
        <h1 className="text-[1rem] text-tertiary-800 font-semibold">
          Add Connection
        </h1>
      </div>
      <div className="px-6 flex my-auto items-center justify-center">
        {linkToken != null && linkToken.length > 0 && (
          <Link linkToken={linkToken} itemId={null}/>
        )}
      </div>
    </div>
  );
};

export default AddConnection;
