import { FormFieldData } from "@/types/components/forms/forms";
import { AddMemberFormSchema } from "@/features/manage-connections/types/form-schemas";
export const memberFields: FormFieldData<AddMemberFormSchema>[] = [
  { id: "full-name", name: "name", placeholder: "Full Name", type: "text" },
  { id: "email", name: "email", placeholder: "Email", type: "email" },
];
