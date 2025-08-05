
import React from "react";

/**
 * Component serves as a divider for login and sign up page.
 * 
 * @returns divider 
 */
const OrDividerSkeleton = () => {
    return (
        <div className="flex justify-center items-center h-[5rem] w-full animate-pulse">
            <div className="w-full h-0.5 bg-gray-300"></div>
            <div className="text-gray-300 text-sm px-4 font-medium">Or</div>
            <div className="w-full h-0.5 bg-gray-300"></div>
        </div>
    );
};

export default OrDividerSkeleton;