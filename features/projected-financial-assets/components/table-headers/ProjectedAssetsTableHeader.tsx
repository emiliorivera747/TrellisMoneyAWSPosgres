import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProjectedAssetsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="text-xs font-medium text-tertiary-700 border-t border-tertiary-400 ">
        <TableHead className="w-[1/4] pl-4">Asset</TableHead>
        <TableHead className="text-center pl-4">Annual Return Rate</TableHead>
        <TableHead className="text-center pl-4">Projection</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProjectedAssetsTableHeader;
