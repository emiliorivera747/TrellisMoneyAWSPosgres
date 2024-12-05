import React, { useMemo, useCallback } from "react";
import { Line, Bar } from "@visx/shape";
import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { curveMonotoneX } from "@visx/curve";
import { scaleTime, scaleLinear } from "@visx/scale";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { max, extent, bisector } from "@visx/vendor/d3-array";
import { timeFormat } from "@visx/vendor/d3-time-format";
import { LinePath } from "@visx/shape";

//Icons
import { TiArrowSortedUp } from "react-icons/ti";

//Functions
import {calculateRateOfChange} from "@/utils/helper-functions/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/calculateYearsBetween";

type TooltipData = AppleStock;

const stock = [
  { date: "2024-01-01", close: 100 },
  { date: "2030-01-01", close: 300 },
  { date: "2035-01-01", close: 400 },
];

export const background = "white";
export const background2 = "white";
export const accentColor = "#94d82d";
export const accentColorDark = "#495057";
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: "1px solid #f1f3f5",
  color: "#343a40",
};

// util
const formatDate = timeFormat("%b %d, %Y");

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;
const bisectDate = bisector<AppleStock, Date>((d) => new Date(d.date)).left;

export default withTooltip<TooltipData>(
  ({
    width,
    height,
    data,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(data, getDate) as [Date, Date],
        }),
      [innerWidth, margin.left, data]
    );

    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(data, getStockValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [margin.top, innerHeight, data]
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        });
      },
      [showTooltip, stockValueScale, dateScale, data]
    );

    return (
      <div style={{ height: height, width: width }} className="">
        {/* Stock value and price change */}
        <div className="flex flex-col">
          <span className="text-xl font-medium text-zinc-800 tracking-wider">
            {tooltipData
              ? `$${getStockValue(tooltipData).toFixed(2)}`
              : "$1000"}
          </span>
          <span
            style={{ color: "#74b816" }}
            className="flex-row flex items-center text-[0.7rem] font-semibold gap-1"
          >
            <TiArrowSortedUp />
            {tooltipData ? renderTooltipContent(tooltipData, data) : "$500"}
          </span>
        </div>

        {/* The SVG for the graph */}
        <svg
          width="100%" // Make the SVG width responsive
          height="80%" // Make the SVG height responsive
          viewBox={`0 0 ${width+6} ${height+6}`} // Use the viewBox to scale the content
          preserveAspectRatio="none" // Prevent aspect ratio issues if the div size changes

        >
          <rect
            x={0}
            y={0}
            width="100%" 
            height="80%"
            fill="url(#area-background-gradient)"
            rx={14}
        
          />
          <LinePath
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            stroke="rgb(0, 200, 5)" // Use the stroke for the line color
            strokeWidth={2}
            curve={curveMonotoneX} // Keep the curve for smoothness if desired
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top + 120 }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={0.6}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={"rgb(0, 200, 5)"}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>

        {/* Tooltip div */}
        {tooltipData && (
          <div>
            <Tooltip
              top={margin.top + 110}
              left={tooltipLeft - 10}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
                fontSize: "0.6rem",
                background: "none",
                border: "none", // Remove the border
                color: "#495057", // Change the text color to red
                boxShadow: "none", // Ensure no box shadow is applied
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
);

const renderTooltipContent = (
  tooltipData: TooltipData | null,
  data: AppleStock[]
) => {
  if (!tooltipData) {
    return "$500";
  }

  const stockValueDifference = getStockValue(tooltipData) - data[0].close;
  const rateOfChange = calculateRateOfChange(
    data[0].close,
    getStockValue(tooltipData)
  );
  const yearsBetween = calculateYearsBetween(
    new Date(data[0].date),
    getDate(tooltipData)
  );

  return (
    <>
      {" $" + stockValueDifference.toFixed(2) + " (" + rateOfChange + "%) "}
      <span className="text-zinc-600 font-normal ">
        {yearsBetween + " years"}
      </span>
    </>
  );
};
