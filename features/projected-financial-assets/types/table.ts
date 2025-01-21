import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { UseFormRegister, Path, FieldValues, FieldErrors, SubmitHandler, UseFormHandleSubmit} from "react-hook-form";
import { HoldingId } from "@/types/plaid";
export interface TableBodyForAssetsProps<TFieldValues extends FieldValues> {
  assets: Assets[];
  defaultValue?: string | number; 
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
}
