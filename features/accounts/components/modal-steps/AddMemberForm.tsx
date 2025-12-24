import { useRef } from "react";

// External Lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Form } from "@/components/ui/form";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";
import BackToRouteButton from "@/features/accounts/components/buttons/BackToRouteButton";

// Zod Schemas
import { AddMemberFormSchema, addMemberFormSchema } from "@/types/form-schemas";
import FormFieldGenerator from "@/components/form-builder/FormFieldsGenerator";

// Data
import { memberFields } from "@/features/accounts/data/MemberFormFields";
import { useConnectionContext } from "../../context/ConnectionContext";

// Services
import { householdService } from "../../services/householdServices";

// Headers
import PrimaryModalHeader from "@/features/accounts/components/headers/PrimaryModalHeader";

const AddMemberForm = () => {
  const { goToRoute, start } = useConnectionContext();

  const buttonRef = useRef(null);

  const form = useForm<AddMemberFormSchema>({
    resolver: zodResolver(addMemberFormSchema),
  });

  const onSubmit = async (data: AddMemberFormSchema) => {
    const res = await householdService.createHouseholdMember(data);
    if (res.ok) start(res.data.member.member_id);
  };

  return (
    <div className="h-full flex flex-col px-6 ">
      <BackToRouteButton route={"owner"} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit || (() => {}))} className="">
          <PrimaryModalHeader title="Provide member details below" />
          <FormFieldGenerator
            fields={memberFields.map((field) => ({
              ...field,
              control: form.control as any,
            }))}
          />
          <PrimarySubmitButton ref={buttonRef} className="mt-8" />
        </form>
      </Form>
    </div>
  );
};

export default AddMemberForm;
