//Types
import { ProjectedAssetsContainerProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

const ProjectedAssetsContainer = ({
  assets,
  children,
}: ProjectedAssetsContainerProps) => {
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
