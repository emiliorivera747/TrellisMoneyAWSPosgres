import { ReactNode } from "react";

/**
 * A component that renders a vertically scrollable section for secondary account content.
 * 
 * @param children - The content to be displayed within the section.
 */
const SecondaryAccountSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-[18rem] sticky top-0  justify-start flex flex-col gap-4 pt-12">
      {children}
    </div>
  );
};

export default SecondaryAccountSection;
