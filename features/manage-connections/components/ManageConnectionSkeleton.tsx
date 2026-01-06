import React from 'react'

const SkeletonItem = () => (
    <div className="flex gap-2 w-full animate-pulse">
        <div className="rounded-[12px] bg-tertiary-200 h-10 w-[80%]"></div>
        <div className="bg-tertiary-200 h-10 w-[6rem] rounded-[12px]"></div>
    </div>
);

/**
 * A functional component that renders a skeleton placeholder for the
 * "Manage Connections" section. It includes a title, description, and
 * a list of skeleton items to indicate loading state.
 *
 * @returns {JSX.Element} The rendered skeleton placeholder component.
 */
const ManageConnectionSkeleton = () => {
    return (
        <div className="mt-[1rem]">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Manage Connections
            </h1>
            <p className="text-sm text-gray-500">
                Here you can manage your connections.
            </p>
            <div className="h-full flex flex-col items-center justify-start pt-6 gap-4 w-[30rem]">
                {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonItem key={index} />
                ))}
            </div>
        </div>
    );
};
export default ManageConnectionSkeleton