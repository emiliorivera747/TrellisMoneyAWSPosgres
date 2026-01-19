import React from "react";

const AccountListHeader = ({ type }: { type: string }) => {
  return (
    <h1 className="text-[1.3rem] font-semibold text-tertiary-900 pb-3">
      {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
    </h1>
  );
};

export default AccountListHeader;
