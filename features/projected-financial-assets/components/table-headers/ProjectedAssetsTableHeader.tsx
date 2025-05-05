import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProjectedAssetsTableHeader = () => {
  return (
    <TableHeader >
      <TableRow className="text-xs font-medium text-tertiary-800 border-none bg-yellow-50 border-tertiary-300">
        <TableHead className="pl-4 w-[6rem]">Asset</TableHead>
        <TableHead className="text-left pl-4">
          Annual Return Rate
        </TableHead>
        <TableHead className="text-start w-[6rem] ">Projection</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProjectedAssetsTableHeader;
