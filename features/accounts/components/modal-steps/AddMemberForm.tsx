// External Lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Form } from "@/components/ui/form";

// Zod Schemas
import { AddMemberFormSchema, addMemberFormSchema } from "@/types/form-schemas";
import FormFieldGenerator from "@/components/form-builder/FormFieldsGenerator";

// Data
import { memberFields } from "@/features/accounts/data/MemberFormFields";

const AddMemberForm = () => {
  const form = useForm<AddMemberFormSchema>({
    resolver: zodResolver(addMemberFormSchema),
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit || (() => {}))}>
        <FormFieldGenerator
          fields={memberFields.map((field) => ({
            ...field,
            control: form.control as any,
          }))}
        />
      </form>
    </Form>
  );
};

export default AddMemberForm;
