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
 * A React functional component that renders a form for adding a new household member.
 * This component utilizes the `useForm` hook with Zod schema validation to manage form state
 * and validation. Upon successful submission, it triggers the creation of a household member
 * and starts a connection using the provided `start` function from the `useConnectionContext` hook.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered AddMemberForm component.
 *
 * @remarks
 * - The form fields are dynamically generated using the `FormFieldGenerator` component.
 * - The `PrimaryModalHeader` component is used to display the form title.
 * - The `PrimarySubmitButton` is used to submit the form.
 * - The `BackToRouteButton` allows navigation back to the "owner" route.
 *
 * @example
 * ```tsx
 * <AddMemberForm />
 * ```
 *
 * @dependencies
 * - `useConnectionContext`: A custom hook to manage connection-related logic.
 * - `useForm`: A hook from `react-hook-form` for form state management.
 * - `zodResolver`: A resolver for integrating Zod schema validation with `react-hook-form`.
 * - `householdService.createHouseholdMember`: A service function to create a new household member.
 *
 * @internal
 * This component is part of the modal steps in the "Add Member" feature.
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
