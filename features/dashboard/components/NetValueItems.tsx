// Components
import NetValueDisplay from "@/components/dashboard/NetValueDisplay";

// Config
import { NET_VALUE_ITEMS } from "@/features/dashboard/config/netValueItems";

/**
 * A React functional component that renders a grid of `NetValueDisplay` components
 * based on the `NET_VALUE_ITEMS` configuration. Each item displays financial data
 * such as net worth, assets, and liabilities.
 *
 * @param {Object} props - The component props.
 * @param {Object | null} props.netWorthData - The financial data to be displayed.
 * @param {Object} props.netWorthData.data - The financial data object.
 * @param {number} props.netWorthData.data.netWorth - The net worth value.
 * @param {number} props.netWorthData.data.assets - The assets value.
 * @param {number} props.netWorthData.data.liabilities - The liabilities value.
 * @param {boolean} props.netWorthLoading - A flag indicating whether the data is still loading.
 *
 * @returns {JSX.Element} A grid layout containing `NetValueDisplay` components.
 */
const NetValueItems = ({
  netWorthData,
  netWorthLoading,
  netWorthError,
  netWorthHasError,
}: {
  netWorthData: {
    data: { netWorth: number; assets: number; liabilities: number };
  };
  netWorthLoading: boolean;
  netWorthError?: Error | null;
  netWorthHasError: boolean;
}) => {
  if (netWorthHasError)
    return <div>There was an error {netWorthError?.message}</div>;
  return (
    <div className="grid grid-cols-2 gap-6 border-b pb-8 border-tertiary-300">
      {NET_VALUE_ITEMS.map((item, index) => (
        <NetValueDisplay
          key={index}
          title={item.title}
          linkLabel={item.linkLabel}
          linkUrl={item.linkUrl}
          primaryValue={item.values(netWorthData).primary}
          secondaryValue={item.values(netWorthData).secondary}
          tertiaryValue={item.values(netWorthData).tertiary}
          secondaryLabel={item.labels.secondary}
          tertiaryLabel={item.labels.tertiary}
          modalTitle={item.modal.title}
          modalDescription={item.modal.description}
          isLoading={netWorthLoading}
        />
      ))}
    </div>
  );
};

export default NetValueItems;
