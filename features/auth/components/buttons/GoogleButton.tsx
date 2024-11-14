import React from "react";
import Image from "next/image";

interface GoogleButtonProps {
  handleFunction: () => void;
  label: string;
}

const GoogleButton = ({ handleFunction, label }: GoogleButtonProps) => {
  return (
    <button
      onClick={handleFunction}
      className="mb-4 px-[.94118rem] py-[1.05882rem] rounded-[12px] w-full text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-[#f1f3f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4"
    >
      <div className="flex-shrink-0">
        <Image
          src="/google_logo.png"
          width={20}
          height={20}
          alt="google logo"
        />
      </div>
      {label}
    </button>
  );
};

export default GoogleButton;
