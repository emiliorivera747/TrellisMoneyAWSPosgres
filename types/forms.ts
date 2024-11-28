import { UseFormRegister, Path, FieldValues, FieldErrors} from "react-hook-form";

export interface PasswordInputProps<TFieldValues extends FieldValues> {
  id?: string;
  placeholder?: string;
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  withPasswordTooltip?: boolean;
}

export interface TextInputProps<TFieldValues extends FieldValues> {
    type: "email"| "text" | "url" | "search"| "tel" |"number"  ;
    id: string;
    placeholder: string;
    fieldName: Path<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
}

export interface Input {
  email: string;
  password1: string;
}