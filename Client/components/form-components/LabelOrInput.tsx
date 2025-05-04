import { useState, createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Define the type for the context
interface LabelOrInputContextType {
  isLabel: boolean;
  handleIsLabel: () => void;
}

const LabelOrInputContext = createContext<LabelOrInputContextType | undefined>(
  undefined
);

function LabelOrInput({ children }: { children: ReactNode }) {
  const [isLabel, setIsLabel] = useState(true);
  const handleIsLabel = () => setIsLabel(!isLabel);

  return (
    <LabelOrInputContext.Provider value={{ isLabel, handleIsLabel }}>
      {children}
    </LabelOrInputContext.Provider>
  );
}

function Label({
  className,
  text,
  ref,
}: {
  className?: string;
  text: string;
  ref: React.Ref<HTMLInputElement>;
} & React.ComponentProps<"button">) {
  const context = useContext(LabelOrInputContext);

  if (!context)
    throw new Error(
      "LabelOrInput must be used within a LabelOrInputContext.Provider"
    );

  const { handleIsLabel, isLabel } = context;
  const defaultClassName =
    "h-[2rem] border-box rounded-[6px] align-text-bottom w-[4rem] px-[1rem] border leading-[1.23536] flex items-center justify-start text-xs hover:border-tertiary-900 hover:bg-tertiary-100 hover:text-bold";

  if (isLabel)
    return (
      <button
        onClick={handleIsLabel}
        className={cn(defaultClassName, className)}
        ref={ref}
      >
        {text}
      </button>
    );

  return null;
}

function Input({ children }: { children: ReactNode }) {
  const context = useContext(LabelOrInputContext);

  // Ensure context is not undefined
  if (!context) {
    throw new Error("LabelOrInput must be used within a LabelOrInputContext.Provider");
  }

  const { isLabel } = context;

  if (!isLabel) return <>{children}</>;
  return null;
}


LabelOrInput.Label = Label;
LabelOrInput.Input = Input;

export default LabelOrInput;
