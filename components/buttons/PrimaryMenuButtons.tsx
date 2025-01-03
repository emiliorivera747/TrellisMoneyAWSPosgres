interface PrimaryDropDownMenuButtonProps {
  actionFn: () => void;
  label?: number | string ;
}

const PrimaryMenuButton = ({
  actionFn,
  label = "Default Label",
}: PrimaryDropDownMenuButtonProps) => {
  if (typeof actionFn !== "function") return <></>;
  if (typeof label !== "number" && typeof label !== "string") return <></>;

  return (
    <button
      className={
        "border-tertiary-500 font-semibold text-xs text-tertiary-800 border rounded-[12px] hover:bg-primary-800 hover:text-white hover:border-transparent hover:font-semibold transition duration-600 ease-in-out py-[0.6rem]"
      }
      onClick={actionFn}
    >
      {label}
    </button>
  );
};


export default PrimaryMenuButton;
