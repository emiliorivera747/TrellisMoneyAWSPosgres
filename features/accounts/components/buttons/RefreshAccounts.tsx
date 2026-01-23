"use client";
import useRefreshAccounts from "@/hooks/accounts/useRefreshAccounts";

// Components
import RefreshButton from "@/components/buttons/RefreshButton";

/**
 * RefreshAccounts component renders a button that triggers a refresh of accounts.
 *
 * @component
 * @returns {JSX.Element} A button element that, when clicked, sends a POST request to refresh household accounts.
 */
const RefreshAccounts = () => {
  const { refreshAccounts } = useRefreshAccounts();

  return <RefreshButton onClickFn={() => refreshAccounts()} />;
};

export default RefreshAccounts;
