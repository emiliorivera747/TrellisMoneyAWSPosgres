import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface Props {
  errMsg: String;
}
const PrimaryErrorMessage = ({ errMsg }: Props) => {
  console.log(errMsg);
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 flex flex-row gap-2 justify-center items-center">
      <strong className="font-bold text-xl">
        <MdErrorOutline />
      </strong>
      <span className="block text-sm">{errMsg}</span>
    </div>
  );
};

export default PrimaryErrorMessage;
