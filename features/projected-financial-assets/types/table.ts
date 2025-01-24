import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { UseFormRegister, Path, FieldValues, FieldErrors, SubmitHandler, UseFormHandleSubmit} from "react-hook-form";
export interface TableBodyForAssetsProps {
  assets: Assets[];
  form: any;
}

export interface AssetsTableProps{
  assets: Assets[];
  form: any;
}
