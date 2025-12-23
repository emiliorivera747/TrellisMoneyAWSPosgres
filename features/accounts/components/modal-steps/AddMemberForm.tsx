import { useRef } from "react";

// External Lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Form } from "@/components/ui/form";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";

// Zod Schemas
import { AddMemberFormSchema, addMemberFormSchema } from "@/types/form-schemas";
import FormFieldGenerator from "@/components/form-builder/FormFieldsGenerator";

// Data
import { memberFields } from "@/features/accounts/data/MemberFormFields";

const AddMemberForm = () => {
  const buttonRef = useRef(null);
  const form = useForm<AddMemberFormSchema>({
    resolver: zodResolver(addMemberFormSchema),
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className="h-full flex flex-col  px-10 pt-4"
      >
        <h1 className="text-tertiary-700 font-light pb-2">
          Provide member details below
        </h1>
        <FormFieldGenerator
          fields={memberFields.map((field) => ({
            ...field,
            control: form.control as any,
          }))}
        />

        <PrimarySubmitButton ref={buttonRef} className="mt-4"/>
      </form>
    </Form>
  );
};

export default AddMemberForm;
