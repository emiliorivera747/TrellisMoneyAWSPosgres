import React from "react";

//Types
import { ProjectedAssetsContainerProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

const ProjectedAssetsContainer = ({
  assets,
  children,
}: ProjectedAssetsContainerProps) => {
  return (
    <aside
      style={{
        border: "1px solid rgb(221, 221, 221)",

      }}
      className={`${
        assets?.length === 0 ? "h-[20rem]" : "h-screen"
      } max-h-screen sticky rounded-[12px]`}
    >
      {children}
    </aside>
  );
};

export default ProjectedAssetsContainer;
