import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useDashboardFilters,
  useDashboardFiltersWithActions,
} from "@/stores/slices/dashboard/dashboardFilters.selectors";

type mode = "edit" | "view";
type setMode = (mode: "edit" | "view") => void;

const HeaderTitle = ({ year }: { year: number }) => (
  <div>
    <span className="text-sm tracking-wider pl-6">Projections</span>
    <span className="font-normal text-[0.9rem] pl-2">{year}</span>
  </div>
);

const HeaderDropdown = ({
  mode,
  setMode,
}: {
  mode: mode;
  setMode: setMode;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <span className="flex justify-end pr-6 text-tertiary-800 hover:text-tertiary-1000 ">
        <div className="hover:bg-tertiary-200 p-2 rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
      </span>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="backdrop-blur bg-tertiary-300/40 px-2 py-2"
    >
      <DropdownMenuLabel className="text-tertiary-800 font-bold text-xs">
        {mode === "edit" ? "Edit Mode" : "View Mode"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {mode === "view" && (
        <DropdownMenuItem className="focus:bg-tertiary-400/50 rounded transition-all duration-300 focus:font-semibold">
          <MenuButton setMode={() => setMode("edit")}>Edit</MenuButton>
        </DropdownMenuItem>
      )}
      {mode === "edit" && (
        <DropdownMenuItem className="focus:bg-tertiary-400/50 rounded transition-all duration-300 focus:font-semibold">
          <MenuButton setMode={() => setMode("view")}>View</MenuButton>
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

const MenuButton = ({
  setMode,
  children,
}: {
  setMode: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className=" rounded h-full w-full text-[0.8rem] text-tertiary-800 items-start flex justify-start "
      onClick={setMode}
    >
      {children}
    </button>
  );
};

export const AssetsCardPrimaryHeader = () => {
  const { mode, selectedProjectedYear: selectedYear } = useDashboardFilters();
  const { setMode } = useDashboardFiltersWithActions();

  return (
    <div className="font-bold text-foreground flex items-center justify-between">
      <HeaderTitle year={selectedYear} />
      <HeaderDropdown mode={mode} setMode={setMode} />
    </div>
  );
};
