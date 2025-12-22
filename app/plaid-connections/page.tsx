"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/global-variables/globals";
import { useRemoveItem } from "@/hooks/react-query/items/useRemoveItem";

const page = () => {
  const [items, setItems] = useState<any[]>([]);

  const { mutateItem, itemIsPending, itemHasError } = useRemoveItem();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`${API_URL}/plaid/items`);
      const response = await res.json();
      setItems(response.data.items);
    };
    fetchItems();
  }, []);

  if (itemIsPending) return <div>Deleting...</div>;
  if (itemHasError) return <div>There was an Error</div>;

  return (
    <section className="h-screen overflow-scroll">
      <div className=" h-full flex-row items-center justify-start pl-20 pt-14">
        <h1 className="pb-6 font-bold text-xl">Items</h1>
        {items?.map(({ item_id }) => {
          return (
            <div key={item_id} className="flex gap-2">
              <div className="rounded-[12px] border border-tertiary-400 py-4 px-4 box-border w-[40%]">
                Item Id: {item_id}
              </div>
              <button
                className="bg-red-700 text-white px-4 font-bold rounded-[12px]"
                onClick={() => mutateItem(item_id)}
              >
                delete
              </button>
            </div>
          );
        })}
        {items.length === 0 && <div className="text-tertiary-700 text-lg">No Items found at the moment</div>}
      </div>
    </section>
  );
};

export default page;
