import React from "react";
import { TableCell} from "@/components/ui/table";
import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";


const AssetName = ({asset}: {asset: Assets}) => {
  const n = asset?.name?.length;


  let nameElement;
  if(n <= 5){
    nameElement = <span className="font-bold uppercase">{(asset.name).substring(0, 5)}</span>;
  }
  else{
    nameElement = <span className="font-bold text-xs">{(asset.name).substring(0, 15)}...</span>;
  }

  return (
    <TableCell className=" pl-6 text-xs w-[8rem] ">
      <div className="flex flex-col">
        {nameElement}
        {(asset?.shares ?? 0) > 0 && <span className="font-normal text-tertiary-800">
          {asset.shares ? asset.shares + " Shares" : null}
        </span>}
      </div>
    </TableCell>
  );
};

export default AssetName;
