"use client";
import useRefreshAccounts from "@/hooks/accounts/useRefreshAccounts";

/**
 * RefreshAccounts component renders a button that triggers a refresh of accounts.
 *
 * @component
 * @returns {JSX.Element} A button element that, when clicked, sends a POST request to refresh household accounts.
 */
const RefreshAccounts = () => {
  const { refreshAccounts } = useRefreshAccounts();

  return (
    <button
      className="border px-4 py-2 rounded-full"
      onClick={() => refreshAccounts()}
    >
      Refresh
    </button>
  );
};

export default RefreshAccounts;
