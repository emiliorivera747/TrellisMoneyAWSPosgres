import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { ResponsiveLineGraphProps } from "@/types/components/admin/graphs/graphs";

/**
 *
 * ResponsiveLineGraphContainer is a wrapper component that uses the ParentSize component from @visx/responsive to make a line graph responsive.
 *
 * @param {string} className - The class name to be applied to the container.
 * @param {React.ComponentType} GraphComponent - The line graph component to be rendered.
 * @param {React.Ref} ref - A ref to be passed to the GraphComponent.
 * @param {object} props - Additional props to be passed to the GraphComponent.
 * 
 * @returns
 */
const ResponsiveLineGraphContainer = ({
  className,
  GraphComponent,
  ref,
  ...props
}: ResponsiveLineGraphProps) => {
  return (
    <div className={className}>
      <ParentSize>
        {({ height, width }: { height: number; width: number }) => (
          <GraphComponent width={width} height={height} {...props} />
        )}
      </ParentSize>
    </div>
  );
};

export default ResponsiveLineGraphContainer;
