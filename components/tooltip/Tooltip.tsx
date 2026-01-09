import { TooltipProps } from "@/types/components/navigation/navigationbar";

/**
 * A custom tooltip component that displays a tooltip with a title
 * when the user hovers over the child element.
 *
 * @param {TooltipProps} props - The props for the CustomTooltip component.
 * @param {string} props.title - The text to display inside the tooltip.
 * @param {React.ReactNode} props.children - The child elements that trigger the tooltip on hover.
 * @returns {JSX.Element} The rendered tooltip component.
 */
const CustomTooltip: React.FC<TooltipProps> = ({ label, children }) => {
  return (
    <div className="relative group transition delay-300">
      {children}
      <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 mb-2 sm:hidden group-hover:block sm:bg-tertiary-800 text-white text-[0.6rem] rounded py-1 px-2 transition delay-300 2xl:bg-transparent bg-transparent z-50">
        {label}
      </div>
    </div>
  );
};
export default CustomTooltip;
