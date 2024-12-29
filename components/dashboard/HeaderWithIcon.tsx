import React from "react";

interface HeaderWithIconProps {
  actionFunction: () => void;
  label: string;
  icon: React.ReactNode;
}

const headerStyle =
  "font-bold text-tertiary-900 text-[1rem] flex items-center gap-2 mb-2";

const HeaderWithIcon = ({
  actionFunction,
  label,
  icon,
}: HeaderWithIconProps) => {
  return (
    <button className={headerStyle} onClick={actionFunction}>
      <div className="block">{label}</div>
      {icon}
    </button>
  );
};

export default HeaderWithIcon;
