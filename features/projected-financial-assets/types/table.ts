import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { UseFormRegister, Path, FieldValues, FieldErrors, SubmitHandler, UseFormHandleSubmit} from "react-hook-form";
export interface TableBodyForAssetsProps<TFieldValues extends FieldValues> {
  assets: Assets[];
  defaultValue?: string | number; 
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
}

export interface AssetsTableProps<TFieldValues extends FieldValues>{
  assets: Assets[];
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
}
