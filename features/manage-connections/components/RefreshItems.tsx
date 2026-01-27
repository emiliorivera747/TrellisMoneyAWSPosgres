"use client";
import RefreshButton from "@/components/buttons/RefreshButton";
import useRefreshItems from "@/hooks/react-query/items/useRefreshItems";

/**
 * RefreshItems component renders a button that triggers an API call
 * to refresh items data.
 *
 * @returns A button element that, when clicked, sends a POST request to refresh data.
 */
const RefreshItems = () => {
  const { refreshItems } = useRefreshItems();
  return <RefreshButton onClickFn={() => refreshItems()} />;
};

export default RefreshItems;
