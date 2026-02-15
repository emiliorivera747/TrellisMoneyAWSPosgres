"use client";

// React
import { useRef } from "react";

// Components
import HoldingHistoryLineGraph from "@/features/holding/components/graphs/HoldingHistoryLineGraph";
import HoldingHeader from "@/features/holding/components/headers/HoldingHeader";
import ResponsiveGraphContainer from "@/components/graphs/primary-time-value-graph/ResponsiveGraphContainer";

// Hooks
import useFetchHoldingHistory from "@/hooks/react-query/holdings/useFetchHoldingHistory";

// Types
import { LineSeriesConfig, TimeSeriesData } from "@/types/components/admin/graphs/data";
import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";

interface HoldingHistoryGraphProps {
  securityId: string;
  holding: AggregateHoldingDetails;
}

const HoldingHistoryGraph = ({ securityId, holding }: HoldingHistoryGraphProps) => {
  const graphContainerRef = useRef(null);
  const { historyData, historyLoading, historyHasError } =
    useFetchHoldingHistory(securityId);

  if (historyLoading) {
    return (
      <div className="h-[32rem] w-full animate-pulse rounded-lg bg-tertiary-200" />
    );
  }

  if (historyHasError || !historyData?.data?.history) {
    return (
      <div className="h-[32rem] w-full flex items-center justify-center text-tertiary-600">
        Unable to load price history
      </div>
    );
  }

  const timeSeriesData: TimeSeriesData[] = historyData.data.history.map(
    (point) => ({
      date: new Date(point.date),
      value: point.value,
    })
  );

  const lineConfigs: LineSeriesConfig[] = [
    {
      data: timeSeriesData,
      strokeWidth: 2,
      filterValue: "Price",
    },
  ];

  return (
    <div className="h-[32rem] grid border-b border-tertiary-300">
      <HoldingHeader holding={holding} />
      <ResponsiveGraphContainer
        className="h-[26rem] w-full border-box"
        ref={graphContainerRef}
        component={HoldingHistoryLineGraph}
        componentProps={{
          lineConfigs,
        }}
      />
    </div>
  );
};

export default HoldingHistoryGraph;
