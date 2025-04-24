import React from "react";
import { TableCell } from "@/components/ui/table";
import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";

const investmentTypes = ["cryptocurrency", "equity", "etf", "mutual fund"];

const AssetName = ({ asset }: { asset: Assets }) => {
  const n = asset?.name?.length;

  let nameElement;
  if (n <= 5) {
    nameElement = (
      <span className="font-bold uppercase">{asset.name.substring(0, 5)}</span>
    );
  } else {
    nameElement = (
      <span className="font-bold  text-[0.7rem] uppercase ">
        {asset.name.substring(0, 10)}...
      </span>
    );
  }

  console.log("ASSET", asset);

  return (
    <TableCell className=" pl-6 text-[0.8rem] w-[8rem]">
      <div className="flex flex-col text-tertiary-1000 font-bold">
        {nameElement}
        {(asset?.shares ?? 0) > 0 && (
          <span className="font-normal text-tertiary-1000">
            {investmentTypes.includes(asset?.subtype)
              ? Number(asset.shares).toFixed(2) + " Shares"
              : "$" + Number(asset.total).toFixed(2) + " Cash"}
          </span>
        )}
      </div>
    </TableCell>
  );
};

export default AssetName;
