import {
  UseFormRegister,
  Path,
  FieldValues,
  FieldErrors,
} from "react-hook-form";

export interface PasswordInputProps<TFieldValues extends FieldValues> {
  id?: string;
  placeholder?: string;
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  withPasswordTooltip?: boolean;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
}

export interface NumberInputProps<TFieldValues extends FieldValues> {
  type?: "number";
  id: string;
  placeholder?: string;
  defaultValue?: number;
  fieldName: string;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  pt?: string;
  px?: string;
  h?: string;
  w?: string;
  rounded?: string;
  errTextSize?: string;
  withPlaceholder?: boolean;
  min?:number;
  max?:number;
}

export interface TextInputProps<TFieldValues extends FieldValues> {
  type: "email" | "text" | "url" | "search" | "tel";
  id: string;
  placeholder: string;
  defaultValue?: string | number;
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  pt?: string;
  px?: string;
  h?: string;
  w?: string;
}

export interface PrimaryInputLabelProps<TFieldValues extends FieldValues> {
  id: string;
  fieldName: string;
  placeholder: string;
  errors: FieldErrors<TFieldValues>;
}

export interface ErrorForInputsProps<TFieldValues extends FieldValues> {
  fieldName: string;
  textSize?: string;
  errors: FieldErrors<TFieldValues>;
}

export interface Input {
  email: string;
  password1: string;
}
