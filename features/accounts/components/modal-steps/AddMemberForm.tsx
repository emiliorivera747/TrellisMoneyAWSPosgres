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
import { useConnectionContext } from "../../context/ConnectionContext";

// Services
import { householdService } from "../../services/householdServices";

const AddMemberForm = () => {
  const { goToRoute } = useConnectionContext();

  const buttonRef = useRef(null);

  const form = useForm<AddMemberFormSchema>({
    resolver: zodResolver(addMemberFormSchema),
  });

  const onSubmit = (data: AddMemberFormSchema) => {
    const res = householdService.createHouseholdMember(data);
  };

  return (
    <div>
      <button
        className="text-xs text-tertiary-700 flex items-center justify-center font-light gap-1 hover:underline"
        onClick={() => goToRoute("owner")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Account Owner
      </button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit || (() => {}))}
          className="h-full flex flex-col px-6 pt-6"
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

          <PrimarySubmitButton ref={buttonRef} className="mt-4" />
        </form>
      </Form>
    </div>
  );
};

export default AddMemberForm;
