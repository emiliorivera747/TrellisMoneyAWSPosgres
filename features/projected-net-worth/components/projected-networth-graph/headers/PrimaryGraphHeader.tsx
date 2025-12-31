import GraphHeaders from "@/components/headers/GraphHeaders";
import MultipleValPriceChange from "@/components/dashboard/MultipleValPriceChange";
import SelectYearMenuButton from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenuButton";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";
import RenderFilters from "@/features/projected-net-worth/components/projected-networth-graph/filters/RenderFilters";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  useDashboardFilters,
  useDashboardFilterActions,
} from "@/stores/slices/dashboardFilters.selectors";

import { PrimaryGraphHeaderProps } from "@/features/projected-net-worth/types/graphComponents";

/**
 * PrimaryGraphHeader component renders the header section for the projected net worth graph.
 * It includes a title, year selection menu, filters, and additional information such as inflation tags.
 *
 * @component
 * @param {PrimaryGraphHeaderProps} props - The props for the PrimaryGraphHeader component.
 * @param {Array} props.linePayloads - The data payloads for the graph lines.
 * @param {TooltipData} props.tooltipData - The data used for the tooltip display.
 * @param {boolean} props.withInflationTag - A flag to determine if the inflation tag should be displayed.
 * @param {Array<number>} props.years - The list of years available for selection.
 *
 * @returns {JSX.Element} The rendered PrimaryGraphHeader component.
 *
 * @remarks
 * - This component uses the `useDashboardFilters` hook to retrieve the current dashboard filter states.
 * - The `useDashboardFilterActions` hook is used to update the filter states.
 * - The `SelectYearMenuButton` component allows users to select a year or edit the retirement year.
 * - The `AlertDialog` component is used to display a modal for filter selection.
 * - The `MultipleValPriceChange` component displays price changes for multiple values.
 * - If `withInflationTag` is true and there is only one line payload, an `InflationTag` is displayed.
 *
 * @example
 * <PrimaryGraphHeader
 *   linePayloads={linePayloads}
 *   tooltipData={tooltipData}
 *   withInflationTag={true}
 *   years={[2023, 2024, 2025]}
 * />
 */
const PrimaryGraphHeader = ({
  linePayloads,
  tooltipData,
  withInflationTag,
  years,
}: PrimaryGraphHeaderProps) => {
  const { selectedYear, retirementYear, selectedFilter } =
    useDashboardFilters();
  const { setSelectedFilter, setRetirementYear, setSelectedYear } =
    useDashboardFilterActions();
  return (
    <header className="flex flex-col w-full h-auto">
      <div className="flex flex-row text-[1.4rem] gap-2 w-full justify-between">
        <div className="flex flex-row gap-4">
          <GraphHeaders label="Future Projection" />
          <div className="flex items-center ">
            <SelectYearMenuButton
              selectedYear={selectedYear}
              years={years}
              retirementYear={retirementYear}
              setSelectedYear={setSelectedYear}
              editRetirementYear={setRetirementYear}
            />
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className=" text-tertiary-1000 border border-tertiary-300 text-xs flex flex-row justify-center gap-2 p-3 px-4 rounded-[12px] hover:bg-tertiary-200 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              Filters
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="shadow-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-6 border-b border-tertiary-400 pb-4 flex justify-between items-center">
                Filters
                <AlertDialogCancel className="border-none shadow-none rounded-full p-3 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </AlertDialogCancel>
              </AlertDialogTitle>
              <RenderFilters
                selectedFilter={selectedFilter}
                handleFilterChange={setSelectedFilter}
              />
            </AlertDialogHeader>
            <AlertDialogFooter className="pt-6">
              <AlertDialogAction className="bg-tertiary-1000 py-6 rounded-[12px]">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-row">
        <MultipleValPriceChange
          payloadForLines={linePayloads}
          tooltipData={tooltipData}
        />
        {withInflationTag && linePayloads.length === 1 && (
          <div className="text-[0.7rem] text-tertiary-1000 gap-1 w-[25%] flex items-start justify-end pt-5">
            <InflationTag linePayload={linePayloads[0]} />
          </div>
        )}
      </div>
    </header>
  );
};

export default PrimaryGraphHeader;
