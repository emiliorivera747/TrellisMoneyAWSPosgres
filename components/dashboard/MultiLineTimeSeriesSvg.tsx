//Visx
import { Bar, LinePath } from "@visx/shape";
import useDateScale from "@/hooks/graphs/useDateScale";
import useStockValueScale from "@/hooks/graphs/useStockvalueScale";
import { curveMonotoneX } from "@visx/curve";

//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors/accessors";

//Components
import TooltipBar from "@/components/dashboard/TooltipBar";

//Hooks
import useHandleTooltipMultiple from "@/hooks/graphs/useHandleTooltipMultiple";

//Types
import { TimeSeriesData } from "@/types/components/admin/graphs/data";
import { MultiLineTimeSeriesSvgProps } from "@/types/components/admin/graphs/props";

//Functions
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/graph-helpers/getTailwindColors";

const defaultMargin = { top: 6, right: 6, bottom: 10, left: 6 };

/**
 * Renders a multi-line graph with a tooltip.
 *
 * @param {number} width - Graph width.
 * @param {number} height - Graph height.
 * @param {Array} lineConfigs - Line data with styles.
 * @param {object} margin - Graph margins.
 * @param {function} showTooltip - Function to show tooltip.
 * @param {function} hideTooltip - Function to hide tooltip.
 * @param {Array} tooltipConfigs - Tooltip data.
 * @param {number} tooltipTop - Tooltip top position.
 * @param {number} tooltipLeft - Tooltip left position.
 *
 * @returns {JSX.Element | null}
 */
const MultiLineTimeSeriesSvg = ({
  width,
  height,
  lineConfigs,
  margin = defaultMargin,
  showTooltip,
  hideTooltip,
  tooltipConfigs,
  tooltipTop,
  tooltipLeft,
  curve = curveMonotoneX,
  backgroundFill = "url(#area-background-gradient)",
}: MultiLineTimeSeriesSvgProps) => {

  if (width < 10 || height < 10) return null;
  if (!lineConfigs) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const dateScale = useDateScale(lineConfigs[0].data, margin, innerWidth); // x-axis
  const allData = lineConfigs.flatMap((line) => line.data);
  const stockValueScale = useStockValueScale(allData, margin, innerHeight); // y-axis
  const directions = lineConfigs.map((line) => getLineDirection(line.data));

  // tooltip handler
  const handleTooltip = useHandleTooltipMultiple(
    (args) => showTooltip(args),
    stockValueScale,
    dateScale,
    ...lineConfigs
  );

  return (
    <svg
      className=""
      width="100%"
      height="86%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <rect
        x={0}
        y={0}
        width="100%"
        height="100%"
        fill={backgroundFill}
        rx={14}
      />
      {lineConfigs.map((linePayload, i) => {
        const { lineColor } = getTailwindColors(directions[i], linePayload) ;
        return (
          <LinePath
            key={i}
            data={linePayload.data}
            x={(d: TimeSeriesData) => (dateScale ? dateScale(getDate(d)) : 0)}
            y={(d: TimeSeriesData) => (stockValueScale ? stockValueScale(getStockValue(d)) : 0)}
            stroke={lineColor}
            strokeWidth={linePayload.strokeWidth ?? 2}
            curve={curve}
          />
        );
      })}
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
      {tooltipConfigs && (
        <TooltipBar
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          margin={margin}
          innerHeight={innerHeight}
          tooltipConfigs={tooltipConfigs}
          stockValueScale={stockValueScale ?? (() => 0)}
          directions={directions}
        />
      )}
    </svg>
  );
};

export default MultiLineTimeSeriesSvg;
