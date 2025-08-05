import React from "react";

/**
 *
 * Component used to display header for login, signup, and more
 *
 * @param label headers label
 * @returns header
 */
const PrimaryAuthHeader = ({ label }: { label: string }) => {
  return (
    <h2 className="text-3xl text-tertiary-900 leading-6 tracking-[0.009em] mb-6 text-center font-semibold">
      {label}
    </h2>
  );
};

export default PrimaryAuthHeader;
