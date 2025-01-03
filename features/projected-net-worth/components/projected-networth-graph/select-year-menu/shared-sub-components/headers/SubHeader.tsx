import React from "react";

const SubHeader = ({ label }: { label: string }) => {
  return <h2 className="text-tertiary-800 text-[0.8rem] mb-2">{label}</h2>;
};

export default SubHeader;
