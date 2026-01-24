import React from "react";

/**
 * A reusable `Card` component that serves as a container for child elements.
 * It provides a styled, scrollable, and responsive layout.
 *
 * @param {Object} props - The props object for the Card component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 * @param {React.Ref<HTMLDivElement>} props.ref - A React ref to access the underlying div element.
 *
 * @returns {JSX.Element} A styled card component wrapping the provided children.
 */
const Card = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div
      className="p-3 border border-tertiary-400 flex flex-col items-start sm:pt-6 sm:pb-8 sm:px-8 sm:mt-6 gap-3 rounded-[12px] box-border overflow-x-scroll"
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Card;
