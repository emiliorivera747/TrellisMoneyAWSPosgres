'use client'
import React from "react";
import { cn } from "@/lib/utils";

//Interface
import { NumberInputV2Props } from "@/types/components/forms/forms";

import { useFormField } from "@/components/ui/form";

const NumberInputV2 = ({
  className,
  ref,
  value,
  ...props
}: NumberInputV2Props & React.ComponentProps<"input">) => {
  const { error } = useFormField();

  const defaultClassName = `h-[2rem] border-box rounded-[6px] align-text-bottom w-[4rem] px-[1rem] p-2  border leading-[1.23536] ${
    error ? "border-red-500 bg-[#fff5f5] text-red-500" : "border-tertiary-600"
  } focus:outline-none focus:ring-2 ${
    error ? "focus:ring-red-500" : "focus:ring-primary-500 focus:border-none"
  }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      props.onChange && props.onChange(e);
    }
  };

  return (
    <input
      type="number"
      className={cn(defaultClassName, className)}
      ref={ref}
      {...props}
      onChange={handleChange}
    />
  );
};

NumberInputV2.displayName = "NumberInputV2";
export default NumberInputV2;
