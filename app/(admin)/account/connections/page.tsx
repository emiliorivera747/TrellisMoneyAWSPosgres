"use client";
import { useRemoveItem } from "@/hooks/react-query/items/useRemoveItem";
import useFetchItems from "@/hooks/react-query/items/useFetchItems";

// Skelton
import ManageConnectionSkeleton from "@/features/manage-connections/components/ManageConnectionSkeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

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

  if (itemsLoading) return <ManageConnectionSkeleton />;
  if (itemHasError) return <div>There was an Error when removing</div>;

  return (
    <div className="mt-[1rem]">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Manage Connections
      </h1>
      <p className="text-sm text-gray-500">
        Here you can manage your connections.
      </p>
      <div className=" h-full flex flex-col items-center justify-start pt-6 gap-4 w-[30rem]">
        {itemsResponse?.data?.items.map(
          ({ item_id, institution_name, member }) => {
            return (
              <div key={item_id} className="flex gap-2 w-full">
                <div className="rounded-[12px] border border-tertiary-400 py-2 px-6 box-border w-[80%] overflow-x-scroll font-light text-tertiary-900 flex  flex-col">
                  <span className="font-semibold">{institution_name}</span>{" "}
                  <span className="font-normal text-tertiary-700 text-[0.9rem]">
                    {member.name ?? member.email}
                  </span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="font-normal p-4 rounded-[12px] transition-all duration-700 ease-in-out flex items-center justify-center hover:bg-[#c92a2a] hover:text-white text-[#e03131]"
                        onClick={() => mutateItem(item_id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    </TooltipTrigger>

                    <TooltipContent
                      side="bottom"
                      align="center"
                      className="bg-tertiary-900"
                    >
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          }
        )}
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
