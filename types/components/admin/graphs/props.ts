// React
import { ReactNode } from "react";

// Visx
import { curveMonotoneX } from "@visx/curve";

// Data
import { TimeSeriesData, LineSeriesConfig } from "./data";

// Config
import { TooltipConfig } from "./tooltips";
import { GraphConfig } from "./graph-config";
import { GraphFilterConfig } from "./filters";

/**
 * Represents the properties for a responsive line graph component.
 * @export
 * @interface ResponsiveLineGraphProps
 */
export interface ResponsiveGraphContainerProps<T = any> {
  /**
   * The CSS class name(s) to apply to the graph component.
   * @type {string}
   * @memberof ResponsiveLineGraphProps
   */
  className?: string;

  /**
   * The React component to be rendered as the graph.
   * This component can accept any props.
   * @type {React.ComponentType<any>}
   * @memberof ResponsiveLineGraphProps
   */
  component: React.ComponentType<T & { width: number; height: number }>;

  /**
   * Props to be passed to the graph component (excluding width and height).
   */
  componentProps: Omit<T, "width" | "height">;

  /**
   * A reference to the HTML element, which can be either a button or a div.
   * @type {React.Ref<HTMLButtonElement | HTMLDivElement>}
   * @memberof ResponsiveLineGraphProps
   */
  ref?: React.Ref<HTMLDivElement> | undefined;

  /**
   * Additional properties that can be passed to the graph component.
   * @type {any}
   * @memberof ResponsiveLineGraphProps
   */
  [key: string]: any;
}

/**
 * Represents the properties for a multi-line time series SVG component.
 * @export
 * @interface MultiLineTimeSeriesSvgProps
 */
export interface MultiLineTimeSeriesSvgProps {
  /**
   * The width of the graph.
   * @type {number}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  width: number;

  /**
   * The height of the graph.
   * @type {number}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  height: number;

  /**
   * The data for the lines to be rendered. Configuration should be provided.
   * @type {LineSeriesConfig[]}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  lineConfigs: LineSeriesConfig[];

  /**
   * The function to show the tooltip.
   * @type {(args: any) => void}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  showTooltip: (args: any) => void;

  /**
   * The function to hide the tooltip.
   * @type {() => void}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  hideTooltip: () => void;

  /**
   * The data to be displayed in the tooltip.
   * @type {TooltipConfig[]}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  tooltipConfigs?: TooltipConfig[];

  /**
   * The top position of the tooltip.
   * @type {number}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  tooltipTop: number;

  /**
   * The left position of the tooltip.
   * @type {number}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  tooltipLeft: number;

  /**
   * The margin of the graph.
   * @type {{ top: number; right: number; bottom: number; left: number }}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  margin?: { top: number; right: number; bottom: number; left: number };

  /**
   * The curve of the line graph.
   * @type {typeof curveMonotoneX}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  curve?: typeof curveMonotoneX;

  /**
   * The background fill color of the graph.
   * @type {string}
   * @memberof MultiLineTimeSeriesGraphProps
   */
  backgroundFill?: string;
}

/**
 * Represents the properties for a component that displays value and price change graphs.
 * @export
 * @interface ValueSummaryProps
 */
export interface ValueSummaryProps {
  /**
   * The payload data for the tooltip, which provides information about the graph's data points.
   * Can be `null` if no tooltip data is available.
   * @type {TooltipConfig | null}
   * @memberof ValueSummaryProps
   */
  tooltipPayload: TooltipConfig | null;

  /**
   * The time series data to be displayed in the graph.
   * @type {TimeSeriesData[]}
   * @memberof ValueSummaryProps
   */
  data: TimeSeriesData[];

  /**
   * Indicates whether the graph should display years in its labels or data points.
   * Defaults to `false` if not provided.
   * @type {boolean}
   * @memberof ValueSummaryProps
   */
  withYears?: boolean;

  /**
   * The Tailwind CSS classes to be applied to the main header of the graph.
   * Can be used for custom styling.
   * @type {string}
   * @memberof ValueSummaryProps
   */
  mainHeaderTailwindCss?: string;

  /**
   * The Tailwind CSS classes to be applied to the sub-header of the graph.
   * Can be used for custom styling.
   * @type {string}
   * @memberof ValueSummaryProps
   */
  subHeaderTailwindCss?: string;

  /**
   * Inline styles to be applied to the sub-header of the graph.
   * @type {React.CSSProperties}
   * @memberof ValueSummaryProps
   */
  subHeaderStyle?: React.CSSProperties;

  /**
   * Indicates whether additional informational content should be displayed in the graph.
   * Defaults to `false` if not provided.
   * @type {boolean}
   * @memberof ValueSummaryProps
   */
  withInfo?: boolean;

  /**
   * The name of the line in the graph, used for labeling or identification purposes.
   * @type {string}
   * @memberof ValueSummaryProps
   */
  lineName?: string;
}

/**
 * Represents the properties for a graph component with a header, time values, and tooltip data.
 * @export
 * @interface HeaderTimeValueGraphProps
 */
export interface HeaderTimeValueGraphProps {
  /**
   * The child components or elements to be rendered within the graph component.
   * @type {ReactNode}
   * @memberof HeaderTimeValueGraphProps
   */
  children: ReactNode;

  /**
   * Unified configuration array pairing each line with its optional tooltip state.
   * @type {GraphConfig[]}
   * @memberof HeaderTimeValueGraphProps
   */
  graphConfigs: GraphConfig[];
}

/**
 * Represents the properties for a title component.
 * @export
 * @interface TitleProps
 */
export interface TitleProps {
  /**
   * The children of the title.
   * @type {ReactNode}
   * @memberof TitleProps
   */
  children: ReactNode;

  /**
   * The class name of the title.
   * @type {string}
   * @memberof TitleProps
   */
  className?: string;

  /**
   * The ref of the title.
   * @type {React.Ref<HTMLButtonElement | HTMLDivElement>}
   * @memberof TitleProps
   */
  ref?: React.Ref<HTMLButtonElement | HTMLDivElement>;
}

/**
 * Represents the properties for a value component.
 * @export
 * @interface ValueProp
 */
export interface ValueProp {
  /**
   * Unified configuration pairing a line with its optional tooltip state.
   * @type {GraphConfig}
   * @memberof ValueProp
   */
  graphConfig: GraphConfig;

  /**
   * The ref of the value.
   * @type {React.Ref<HTMLButtonElement | HTMLDivElement>}
   * @memberof ValueProp
   */
  ref?: React.Ref<HTMLButtonElement | HTMLDivElement>;

  /**
   * The class name of the value.
   * @type {string}
   * @memberof ValueProp
   */
  className?: string;
}

/**
 * Represents the properties for a value change component.
 * @export
 * @interface ValueChangeProps
 */
export interface ValueChangeProps {
  /**
   * Unified configuration pairing a line with its optional tooltip state.
   * @type {GraphConfig}
   * @memberof ValueChangeProps
   */
  graphConfig: GraphConfig;

  /**
   * The ref of the value.
   * @type {React.Ref<HTMLParagraphElement>}
   * @memberof ValueChangeProps
   */
  ref?: React.Ref<HTMLParagraphElement>;

  /**
   * The class name of the value.
   * @type {string}
   * @memberof ValueChangeProps
   */
  className?: string;

  /**
   * Inline styles to be applied to the value change element.
   * @type {React.CSSProperties}
   * @memberof ValueChangeProps
   */
  style?: React.CSSProperties;

  /**
   * With years or not.
   * @type {boolean}
   * @memberof ValueChangeProps
   */
  withYears?: boolean;
}

/**
 * Represents the properties for a value price change label component.
 * @export
 * @interface ValuePriceChangeLabelProps
 */
/**
 * Represents the properties for the TotalYears component.
 * @export
 * @interface TotalYearsProps
 */
export interface TotalYearsProps {
  /**
   * Unified configuration pairing a line with its optional tooltip state.
   * @type {GraphConfig}
   */
  graphConfig: GraphConfig;

  /**
   * Optional CSS class name.
   * @type {string}
   */
  className?: string;
}

export interface ValuePriceChangeLabelProps {
  /**
   * The difference in value.
   * @type {number}
   * @memberof ValuePriceChangeLabelProps
   */
  valueDifference: number;
  /**
   * The rate of change.
   * @type {number}
   * @memberof ValuePriceChangeLabelProps
   */
  rateOfChange: number;
  /**
   * The ref of the value.
   * @type {React.Ref<HTMLParagraphElement>}
   * @memberof ValuePriceChangeLabelProps
   */
  ref?: React.Ref<HTMLParagraphElement>;

  /**
   * The class name of the value.
   * @type {string}
   * @memberof ValuePriceChangeLabelProps
   */
  className?: string;

  /**
   * Inline styles to be applied to the label.
   * @type {React.CSSProperties}
   * @memberof ValuePriceChangeLabelProps
   */
  style?: React.CSSProperties;
}

export interface GraphConfigSummaryListProps {
  graphConfigs: GraphConfig[];
  className?: string;
}

export interface GraphHeaderWithFilterProps {
  filterConfig: GraphFilterConfig[];
  filterRef: React.Ref<HTMLDivElement>;
  label: string;
}

export type ValueChangeWithYearsProps = {
  /** The graph configuration containing data for value change calculations */
  graphConfig: GraphConfigSummaryListProps["graphConfigs"][number];
  /** The color applied to the ValueChange text, typically derived from directional colors */
  primaryTextColor: string;
};

export type GraphSummaryHeaderContextVal = {
  graphConfigs: GraphConfig[];
};

export interface ValueHeaderProps {
  graphConfig: GraphConfig;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Props for the Header sub-component of GraphSummaryHeader.
 * @export
 * @interface GraphSummaryHeaderHeaderProps
 */
export interface GraphSummaryHeaderHeaderProps {
  /**
   * The label text to display in the header.
   * @type {string}
   */
  label: string;

  /**
   * Optional CSS class name.
   * @type {string}
   */
  className?: string;

  /**
   * Optional ref for the header element.
   * @type {React.Ref<HTMLHeadingElement>}
   */
  ref?: React.Ref<HTMLHeadingElement>;
}

/**
 * Props for the FilterButton sub-component of GraphSummaryHeader.
 * @export
 * @interface GraphSummaryHeaderFilterButtonProps
 */
export interface GraphSummaryHeaderFilterButtonProps<T> {
  handleFilterChange: (filter: T) => void;
  selectedFilter: T;
  label?: string;
  filterConfig: Array<{
    key: T;
    label: string;
    svgPath: string;
    color: string;
  }>;
}
