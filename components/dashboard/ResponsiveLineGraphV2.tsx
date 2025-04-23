
import ParentSize from "@visx/responsive/lib/components/ParentSize";

// Define props for ResponsiveLineGraphV2
interface ResponsiveLineGraphV2Props {
  className: string;
  GraphComponent: React.ComponentType<any>; // Define GraphComponent type
  ref: React.Ref<HTMLButtonElement>;
  [key: string]: any; // Catch-all for any other props
}

const ResponsiveLineGraphContainer = ({
  className,
  GraphComponent,
  ref,
  ...props
}: ResponsiveLineGraphV2Props) => {
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
