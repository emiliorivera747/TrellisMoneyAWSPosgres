import React from "react";
import { HeaderWithIconProps } from "@/features/projected-net-worth/types/graphComponents";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * A header component that displays a label with an icon and an optional tooltip.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {() => void} props.actionFunction - The function to be called when the header is clicked.
 * @param {string} props.label - The text label to be displayed in the header.
 * @param {React.ReactNode} props.icon - The icon to be displayed next to the label.
 * @param {string} props.toolTipLabel - The text to be displayed inside the tooltip.
 *
 * @returns {React.ReactNode} The rendered header component with an icon and tooltip.
 */
const HeaderWithIcon = ({
  actionFunction = () => {},
  label = "Label",
  icon = "Icon",
  toolTipLabel = "label",
}: HeaderWithIconProps): React.ReactNode => {
  return (
    <div
      className={
        "font-bold text-tertiary-900 text-[1rem] flex items-center gap-2 mb-1 cursor-pointer"
      }
      onClick={actionFunction}
    >
      <div className="block">{label}</div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="hover:bg-tertiary-400 flex items-center justify-center p-2 rounded-full hover:font-bold">
              {icon}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-tertiary-800 text-xs">
            <div className="text-[0.6rem] font-semibold">
              {toolTipLabel}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HeaderWithIcon;
