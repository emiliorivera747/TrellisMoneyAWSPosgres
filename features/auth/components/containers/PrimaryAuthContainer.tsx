import React from "react";

const PrimaryAuthContainer = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg">
            {children}
        </div>
    );
};

export default PrimaryAuthContainer;
