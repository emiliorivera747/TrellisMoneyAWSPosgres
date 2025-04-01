"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";

// Types
interface AssetsData {
  [key: string]: any;
}

interface AssetsFormProps {
  form: any;
  assets: AssetsData[];
  selectedYear: number | string;
  isLoading: boolean;
  onSubmit: (data: any) => void;
  mode: "edit" | "view";
  handleModeChange: () => void;
}


/**
 * 
 * AssetsForm component is in charge of rendering the form for the projected assets.
 * 
 * @param param0 
 * @returns 
 */
const AssetsForm: React.FC<AssetsFormProps> = ({
  form,
  assets,
  selectedYear,
  isLoading,
  onSubmit,
  mode,
  handleModeChange
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-rows-[1fr_6rem] gap-6 h-full col-span-10 sm:col-span-3 sm:row-span-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ProjectedAssetsCard
          assets={assets}
          selectedYear={Number(selectedYear)}
          form={form}
          isLoading={isLoading}
          mode={mode}
          handleModeChange={handleModeChange}
        />
      </form>
    </Form>
  );
};

export default AssetsForm;