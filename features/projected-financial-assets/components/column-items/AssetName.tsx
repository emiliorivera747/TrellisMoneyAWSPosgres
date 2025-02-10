import React from "react";
import { TableCell} from "@/components/ui/table";

const AssetName = ({asset}: any) => {
  return (
    <TableCell className=" pl-4 text-xs w-[1/3] ">
      <div className="flex flex-col">
        <span className="font-bold uppercase">{asset.name}</span>
        <span className="font-normal text-tertiary-800">
          {asset.shares ? asset.shares + " Shares" : null}
        </span>
      </div>
    </TableCell>
  );
};

export default AssetName;
