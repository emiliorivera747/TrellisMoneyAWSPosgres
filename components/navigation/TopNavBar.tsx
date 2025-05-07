import React from "react";
// import Avatar from "@mui/material/Avatar";
import { CldImage } from "next-cloudinary";

interface TopPageNavProps {
  title: string;
  avatarURL: string;
  avatarAlt?: string;
}

const TopPageNav: React.FC<TopPageNavProps> = ({
  title,
  avatarURL,
  avatarAlt,
}) => {
  return (
    <nav className="flex flex-row justify-between items-center py-4 border-b border-tertiary-200 mx-6">
      <div className="text-md font-semibold">
        {" "}
        <CldImage
          alt="Trellis Money Logo"
          src="https://res.cloudinary.com/dxxdfgpdh/image/upload/v1746636902/Logo_1_x4lnlu.ico"
          width="1000"
          height="1000"
          className=" h-[3rem] w-[4rem] sm:h-[4rem] sm:w-[5rem] p-2 font-bold object-contain"
          crop={{
            type: "auto",
            source: true,
          }}
        />
        <h1 className="text-zinc-800">{title}</h1>
      </div>
      {/* <Avatar
        className="w-[2.2rem] h-[2.2rem]"
        alt={avatarAlt}
        src={avatarURL}
      /> */}
    </nav>
  );
};

export default TopPageNav;
