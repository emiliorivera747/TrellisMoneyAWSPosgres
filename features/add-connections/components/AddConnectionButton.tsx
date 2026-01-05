import AddConnection from "@/features/accounts/components/AddConnection";
import { ConnectionProvider } from "@/features/accounts/context/ConnectionContext";
import CustomTooltip from "@/components/tooltip/CustomTooltip";

const AddConnectionButton = ({ label = "Add Account" }: { label?: string }) => {
  return (
    <ConnectionProvider>
      <CustomTooltip label={label}>
        <AddConnection>
          <span
            className={`h-[3rem] rounded-[12px]  px-4 2xl:p-2 border-box 2xl:flex-row 2xl:w-28 2xl:justify-start 2xl:text-[3rem] items-center text-[2rem] sm:h-[3rem] sm:w-[3rem] 2xl:rounded-[12px] rounded:[12px] sm:rounded-[100%] flex flex-col text-center justify-center gap-2 hover:bg-tertiary-300 transition duration-500 ease-in-out  

`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-tertiary-1000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </AddConnection>
      </CustomTooltip>
    </ConnectionProvider>
  );
};

export default AddConnectionButton;
