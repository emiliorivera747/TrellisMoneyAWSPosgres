import React from "react";

const GraphHeaders = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center">
      <span className="tracking-wider font-medium text-tertiary-900 not-italic ">
        {label}
      </span>
    </div>
  );
};

export default GraphHeaders;
