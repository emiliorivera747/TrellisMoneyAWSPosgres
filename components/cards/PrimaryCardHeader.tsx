import InformationIcon from "@/components/information-icon/InformationIcon";

const PrimaryCardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-md justify-start text-tertiary-800 display flex flex-row items-center gap-2">
      {children}
    </h1>
  );
};

export default PrimaryCardHeader;
