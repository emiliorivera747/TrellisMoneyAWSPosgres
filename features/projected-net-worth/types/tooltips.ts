import { TimeSeriesData } from "@/types/components/admin/graphs/data";
import { TooltipPayload } from "@/types/components/admin/graphs/tooltips";

/**
 * Properties for rendering tooltip content in the projected net worth graph.
 * @export
 * @interface RenderTooltipContentProps
 */
export interface RenderTooltipContentProps {
    /**
     * The tooltip payload data to be displayed, or null if no tooltip is shown.
     * @type {TooltipPayload | null}
     * @memberof RenderTooltipContentProps
     */
    tooltipPayload: TooltipPayload | null;

    /**
     * The time series data for the graph.
     * @type {TimeSeriesData[]}
     * @memberof RenderTooltipContentProps
     */
    data: TimeSeriesData[];

    /**
     * Whether to display years in the tooltip.
     * @type {boolean}
     * @memberof RenderTooltipContentProps
     */
    withYears?: boolean;

    /**
     * Optional name of the line to display in the tooltip.
     * @type {string}
     * @memberof RenderTooltipContentProps
     */
    lineName?: string;
  }