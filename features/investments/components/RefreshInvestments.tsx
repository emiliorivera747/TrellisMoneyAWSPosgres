"use client";
import RefreshButton from "@/components/buttons/RefreshButton";
import useRefreshInvestments from "@/hooks/investments/useRefreshInvestments";

/**
 * RefreshInvestments component renders a button that triggers an API call
 * to refresh investment account holdings.
 *
 * @returns A button element that, when clicked, sends a POST request to refresh data.
 */
const RefreshInvestments = () => {
  const { refreshInvestments } = useRefreshInvestments();

  return <RefreshButton onClickFn={() => refreshInvestments()} />;
};

export default RefreshInvestments;
