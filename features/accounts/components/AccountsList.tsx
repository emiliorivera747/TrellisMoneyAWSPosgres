import React from "react";
import { Item } from "@/types/plaid";

/**
 *
 * Responsible for showing all of the accounts
 *
 *
 * @param param0
 * @returns
 */
const AccountsList = ({ items }: { items: Item[] }) => {
  console.log("items", items);
  if (!items) return <div className="text-center text-md text-tertiary-800">No accounts found</div>;
  
  return (
    <div>
      {items?.map((item: Item) => {
        return (
          <div
            key={item.item_id}
            className="border border-tertiary-400 p-4 rounded-[12px] mb-4"
          >
            {item.institution_id}
          </div>
        );
      })}
    </div>
  );
};

export default AccountsList;
