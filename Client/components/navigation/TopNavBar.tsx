import React from "react";
// import Avatar from "@mui/material/Avatar";

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
