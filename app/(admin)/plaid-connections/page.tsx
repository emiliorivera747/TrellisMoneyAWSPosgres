"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/global-variables/globals";
import { useRemoveItem } from "@/hooks/react-query/items/useRemoveItem";

/**
 * This is a React functional component that displays a list of items fetched from an API
 * and allows the user to delete individual items. It uses React hooks for state management
 * and side effects.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - The component fetches items from the API endpoint `${API_URL}/plaid/items` on mount
 *   using the `useEffect` hook.
 * - The `useRemoveItem` custom hook is used to handle item deletion, providing the `mutateItem`
 *   function and state flags (`itemIsPending` and `itemHasError`).
 * - The `itemIsPending` flag is used to display a "Deleting..." message while an item is being deleted.
 * - The `itemHasError` flag is used to display an error message if an error occurs during deletion.
 *
 * @example
 * ```tsx
 * import Page from './page';
 *
 * const App = () => {
 *   return <Page />;
 * };
 * ```
 *
 * @hook
 * - `useState`: Manages the `items` state, which holds the list of items fetched from the API.
 * - `useEffect`: Fetches the items from the API when the component mounts.
 * - `useRemoveItem`: Custom hook for handling item deletion.
 *
 * @dependencies
 * - `API_URL`: A constant that holds the base URL for the API.
 * - `useRemoveItem`: A custom hook that provides functionality for removing items.
 *
 * @styles
 * - The component uses Tailwind CSS classes for styling.
 * - The `h-screen`, `overflow-scroll`, `flex-row`, and other classes are used for layout and design.
 *
 * @errors
 * - Displays "There was an Error" if `itemHasError` is true.
 * - Displays "No Items found at the moment" if the `items` array is empty.
 */
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
