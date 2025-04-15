import React from "react";
import InformationIcon from "@/components/information-icon/InformationIcon";
const GraphHeaders = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center ">
      <span className="tracking-wider font-medium text-tertiary-900 not-italic ">
        {label}
      </span>
      <InformationIcon
        modalTitle={"Future Projection"}
        size={"size-7"}
        modalDescription="The projected amount of your overall portfolio value in the future. This is based on your current portfolio value, the expected rate of return, and the time period you select."
      />
    </div>
  );
};

export default GraphHeaders;
