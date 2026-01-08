//Types
import { ProjecteAssetsContainerProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

/**
 * A container component for projected assets that adjusts its height
 * based on the number of assets provided.
 *
 * @param assets - An array of assets to be displayed.
 * @param children - The child components or elements to render inside the container.
 */
const ProjectedAssetsContainer = ({
  assets,
  children,
}: ProjecteAssetsContainerProps) => {
  if (!assets) return;
  return (
    <aside
      className={`${
        assets?.length === 0 ? "h-[20rem]" : "h-[90vh]"
      } max-h-screen sticky rounded-[12px]`}
    >
      {children}
    </aside>
  );
};

export default ProjectedAssetsContainer;
