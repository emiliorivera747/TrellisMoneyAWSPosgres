import React from "react";

import { cn } from "@/lib/utils";
import { PrimaryHeaderProps } from "@/types/components/marketing/headers";

/**
 * PrimaryHeader component renders a styled header element with customizable classes and label.
 *
 * @param {PrimaryHeaderProps} props - The properties for the PrimaryHeader component.
 * @param {string} props.className - Additional CSS classes to apply to the header element.
 * @param {string} props.label - The text content to display inside the header.
 * @param {React.Ref<HTMLHeadingElement>} props.ref - A ref to be attached to the header element.
 *
 * @returns {JSX.Element} A styled `<h1>` element with the provided label and classes.
 */
const PrimaryHeader = ({ className, label, ref }: PrimaryHeaderProps): JSX.Element => {
  const defaultClasses =
    "text-center text-3xl font-bold text-tertiary-900  bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-transparent mt-[5rem]";
  return (
    <h1 className={cn(defaultClasses, className)} ref={ref}>
      {label}
    </h1>
  );
};

export default PrimaryHeader;
