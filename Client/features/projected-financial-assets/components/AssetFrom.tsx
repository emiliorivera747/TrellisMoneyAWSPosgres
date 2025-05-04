"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";

interface AssetsFormProps {
  form: any;
  onSubmit: (data: any) => void;
}

/**
 *
 * AssetsForm component is in charge of rendering the form for the projected assets.
 *
 * @param param0
 * @returns
 */
const AssetsForm: React.FC<AssetsFormProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-rows-[1fr_6rem] gap-6 col-span-10 sm:col-span-3 sm:row-span-1 w-[23rem] border-box overflow-hidden"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ProjectedAssetsCard />
      </form>
    </Form>
  );
};

export default AssetsForm;
