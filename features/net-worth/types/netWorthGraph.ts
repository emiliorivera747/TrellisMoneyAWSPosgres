import { LineSeriesConfig } from "@/types/components/admin/graphs/graphs";
import { TimeSeriesData } from "@/types/components/admin/graphs/graphs";


export interface ProjectedLineGraphProps {
  /**
   * Width of the graph.
   */
  width: number;

  /**
   * Height of the graph.
   */
  height: number;

  /**
   *  All lines to be displayed on the graph with their data.
   */
  linePayloads: LineSeriesConfig[];

  /**
   * Margin for the graph.
   */
  margin?: { top: number; right: number; bottom: number; left: number };

  /**
   *  Show tooltip function to display the tooltip on hover.
   * @param args
   * @returns
   */
  showTooltip?: (args: any) => void;

  /**
   * Hide tooltip function to hide the tooltip on mouse leave.
   *
   * @returns
   */
  hideTooltip?: () => void;

  /**
   * Tooltip data to be displayed on hover.
   */
  tooltipData?: any;

  /**
   * Top position of the tooltip.
   */
  tooltipTop?: number;

  /**
   * Left position of the tooltip.
   */
  tooltipLeft?: number;

  /**
   * Years to be displayed on the x-axis of the graph.
   */
  years: number[];
}

export interface NetWorthHistory {
  /**
   * The data for the net worth history.
   */
  data: TimeSeriesData[];

  /**
   * The value for the net worth history.
   */
  value: "Net Worth";
}
