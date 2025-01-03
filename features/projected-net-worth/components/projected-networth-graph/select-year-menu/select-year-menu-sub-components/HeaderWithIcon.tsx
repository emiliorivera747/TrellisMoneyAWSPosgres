import React from "react";
import { HeaderWithIconProps } from "@/features/projected-net-worth/types/graphComponents";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const headerStyle =
  "font-bold text-tertiary-900 text-[1rem] flex items-center gap-2 mb-1 cursor-pointer";

const HeaderWithIcon = ({
  actionFunction,
  label,
  icon,
  toolTipLabel,
}: HeaderWithIconProps) => {
  return (
    <div className={headerStyle} onClick={actionFunction}>
      <div className="block">{label}</div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="hover:bg-tertiary-400 flex items-center justify-center p-2 rounded-full hover:font-bold">
              {icon}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-tertiary-800">
            <div className="text-xs font-semibold">{toolTipLabel}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HeaderWithIcon;
