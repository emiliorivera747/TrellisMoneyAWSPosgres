import { useRef } from "react";

// External Lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Form } from "@/components/ui/form";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";
import BackToRouteButton from "@/features/accounts/components/buttons/BackToRouteButton";

// Zod Schemas
import { AddMemberFormSchema, addMemberFormSchema } from "@/features/manage-connections/types/form-schemas";
import FormFieldGenerator from "@/components/form-builder/FormFieldsGenerator";

// Data
import { memberFields } from "@/features/accounts/data/MemberFormFields";
import { useConnectionContext } from "../../../manage-connections/context/ConnectionContext";

// Services
import { householdService } from "../../services/householdServices";

// Headers
import PrimaryModalHeader from "@/features/accounts/components/headers/PrimaryModalHeader";

/**
 * A React component for adding a new household member using a form.
 * Utilizes `useForm` with Zod schema validation for form state and validation.
 * On submission, creates a household member and starts a connection via `useConnectionContext`.
 *
 * @returns {JSX.Element} AddMemberForm component.
 *
 * @example
 * <AddMemberForm />
 *
 * @dependencies
 * - `useConnectionContext`: Manages connection logic.
 * - `useForm`: Form state management from `react-hook-form`.
 * - `zodResolver`: Integrates Zod validation with `react-hook-form`.
 * - `householdService.createHouseholdMember`: Creates a new household member.
 */
const AddMemberForm = () => {
  const { start, close } = useConnectionContext();

  const buttonRef = useRef(null);

  const form = useForm<AddMemberFormSchema>({
    resolver: zodResolver(addMemberFormSchema),
  });

  const onSubmit = async (data: AddMemberFormSchema) => {
    const res = await householdService.createHouseholdMember(data);
    if (res.status === "success") {
      start(res.data.member.member_id);
      close()
    }
  };

  return (
    <div className="h-full flex flex-col px-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit || (() => {}))} className="mt-2">
          <PrimaryModalHeader title="Provide member details below" />
          <div className="flex flex-col gap-[0.4rem] pt-1">
            <FormFieldGenerator
              fields={memberFields.map((field) => ({
                ...field,
                control: form.control as any,
              }))}
            />
          </div>
          <PrimarySubmitButton ref={buttonRef} className="mt-4 mb-4" />
        </form>
      </Form>
      <BackToRouteButton route={"owner"} />
    </div>
  );
};

export default AddMemberForm;
