import React from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

// Define props for ResponsiveLineGraphV2
interface ResponsiveLineGraphV2Props {
  tailwindClasses: string;
  GraphComponent: React.ComponentType<any>; // Define GraphComponent type
  [key: string]: any; // Catch-all for any other props
}

const ResponsiveLineGraphV2 = ({
  tailwindClasses,
  GraphComponent,
  ...props
}: ResponsiveLineGraphV2Props) => {
  return (
    <div className={`${tailwindClasses}`}>
      <ParentSize>
        {({ height, width }: { height: number; width: number }) => (
          <GraphComponent width={width} height={height} {...props} />
        )}
      </ParentSize>
    </div>
  );
};

export default ResponsiveLineGraphV2;
