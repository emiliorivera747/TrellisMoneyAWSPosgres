import { AssetsGridLayoutProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

/**
 * A layout component for displaying assets in a grid format.
 *
 * @param {AssetsGridLayoutProps} props - The properties for the component.
 * @param {"edit" | "view"} props.mode - Determines the layout mode.
 *        "edit" includes an additional row for editing controls.
 *
 * @returns {JSX.Element} The rendered grid layout.
 */
const AssetsGridLayout = ({ mode, children }: AssetsGridLayoutProps) => {
  return (
    <div
      className={`grid no-scrollbars rounded-[12px] pb-6 border border-tertiary-400 ${
        mode === "edit" ? "grid-rows-[4rem_1fr_6rem]" : "grid-rows-[4rem_1fr]"
      } absolute w-full text-[#343a40] h-auto max-h-[90vh] overflow-y-hidden`}
    >
      {children}
    </div>
  );
};

export default AssetsGridLayout;
