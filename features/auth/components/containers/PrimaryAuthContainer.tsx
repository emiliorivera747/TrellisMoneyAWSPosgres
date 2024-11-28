import React from "react";

const PrimaryAuthContainer = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col w-full max-w-[480px] pt-8 rounded-lg x-6 min-h-full h-auto px-6 mb-auto mt-[1%]">
            {children}
        </div>
    );
};

export default PrimaryAuthContainer;
