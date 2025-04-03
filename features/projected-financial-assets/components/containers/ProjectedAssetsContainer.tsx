import React from 'react'

//Types
import { ProjectedAssetsContainerProps } from '@/features/projected-financial-assets/types/projectedAssetsCard'

const ProjectedAssetsContainer = ({ assets, children }: ProjectedAssetsContainerProps) => {
    return (
        <aside
            style={{
                border: "1px solid rgb(221, 221, 221)",
                // boxShadow:'rgba(0, 0, 0, 0.09) 0px 3px 12px',
                scrollbarWidth: "none",
            }}
            className={`${
                assets?.length === 0 ? "h-[25rem]" : "h-[34rem]"
            } max-h-screen overflow-y-auto sticky rounded-[12px]`}
        >
            {children}
        </aside>
    )
}

export default ProjectedAssetsContainer