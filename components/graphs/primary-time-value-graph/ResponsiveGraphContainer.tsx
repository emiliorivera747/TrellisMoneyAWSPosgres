// External Libraries
import ParentSize from "@visx/responsive/lib/components/ParentSize";

// Types
import { ResponsiveGraphContainerProps } from "@/types/components/admin/graphs/props";

/**
 *
 * ResponsiveLineGraphContainer is a wrapper component that uses the ParentSize component 
 * from @visx/responsive to make a line graph responsive.
 *
 * @param {string} className - The class name to be applied to the container.
 * @param {React.ComponentType} GraphComponent - The line graph component to be rendered.
 * @param {React.Ref} ref - A ref to be passed to the GraphComponent.
 * @param {object} props - Additional props to be passed to the GraphComponent.
 *
 * @returns
 */
function ResponsiveGraphContainer<T = any>({
  className,
  component: Component,
  componentProps,
  ref,
}: ResponsiveGraphContainerProps<T>) {
  return (
    <div className={className} ref={ref}>
      <ParentSize>
        {({ height, width }: { height: number; width: number }) => (
          <Component width={width} height={height} {...(componentProps as T)} />
        )}
      </ParentSize>
    </div>
  );
}

export default ResponsiveGraphContainer;
