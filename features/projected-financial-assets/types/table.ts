import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { UseFormRegister, Path, FieldValues, FieldErrors} from "react-hook-form";

export interface TableBodyForAssetsProps<TFieldValues extends FieldValues> {
  assets: Assets[];
  defaultValue?: string | number; 
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
}
