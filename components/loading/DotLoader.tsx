import React from "react";

const DotLoader = ({
    bgColor = "bg-gray-500",
    dotWidth = "w-2",
    dotHeight = "h-2",
    containerHeight = "h-5",
}: {
    bgColor?: string;
    dotWidth?: string;
    dotHeight?: string;
    containerHeight?: string;
}) => {
    return (
        <div id="loading-dots" className={`loading-dots ${containerHeight}`}>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
        </div>
    );
};

export default DotLoader;
