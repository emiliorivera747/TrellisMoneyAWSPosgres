"use client";
import { useRemoveItem } from "@/hooks/react-query/items/useRemoveItem";
import useFetchItems from "@/hooks/react-query/items/useFetchItems";

/**
 * Page component for managing connections.
 *
 * This component fetches and displays a list of items from the server,
 * allowing users to delete individual items. It handles loading and error
 * states during the deletion process.
 *
 * @component
 * @returns {JSX.Element} The rendered page component.
 *
 * @remarks
 * - Fetches items from the API on initial render.
 * - Displays a loading message while an item is being deleted.
 * - Displays an error message if an error occurs during deletion.
 *
 * @example
 * <page />
 *
 * @dependencies
 * - `useState` and `useEffect` from React for state management and side effects.
 * - `useRemoveItem` custom hook for handling item deletion.
 * - Tailwind CSS classes for styling.
 */
const page = () => {
  const { mutateItem, itemIsPending, itemHasError } = useRemoveItem();
  const { itemsResponse, itemsError, itemsLoading, itemsHasError } =
    useFetchItems();

  if (itemsLoading) return <div>Loading...</div>;
  if (itemHasError) return <div>There was an Error when removing</div>;
  console.log(itemsResponse?.data?.items);

  return (
    <div className="mt-[1rem]">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Manage Connections
      </h1>
      <p className="text-sm text-gray-500">
        Here you can manage your connections.
      </p>
      <div className=" h-full flex flex-col items-center justify-start pt-6 gap-4 w-[30rem]">
        {itemsResponse?.data?.items.map(({ item_id, institution_name }) => {
          return (
            <div key={item_id} className="flex gap-2 w-full">
              <div className="rounded-[12px] border border-tertiary-400 py-4 px-8 box-border w-[80%] overflow-x-scroll font-semibold text-tertiary-800">
                {institution_name}
              </div>
              <button
                disabled={itemIsPending}
                className="bg-[#e03131] hover:bg-[#c92a2a] font-semibold  hover:font-extrabold text-white px-4  rounded-[12px] w-[6rem] inline-block"
                onClick={() => mutateItem(item_id)}
              >
                delete
              </button>
            </div>
          );
        })}
        {itemsResponse?.data?.items?.length === 0 && (
          <div className="text-tertiary-700 text-lg">
            No Items found at the moment
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
