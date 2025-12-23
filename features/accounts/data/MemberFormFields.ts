import { FormFieldData } from "@/types/forms";
import { AddMemberFormSchema } from "@/types/form-schemas";
export const memberFields: FormFieldData<AddMemberFormSchema>[] = [
  { id: "full-name", name: "fullName", placeholder: "Full Name", type: "text" },
  { id: "email", name: "email", placeholder: "Email", type: "email" },
];
