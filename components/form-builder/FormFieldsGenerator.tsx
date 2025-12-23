// Components
import { FormField } from "@/components/ui/form";
import TextInput from "@/components/form-components/TextInputV2";

// Types
import { FormFieldGeneratorProps } from "@/types/forms";

/**
 * 
 * Given array of fields list all of the the fields
 * 
 */
const FormFieldGenerator = ({ fields }: FormFieldGeneratorProps) => {
  return (
    <>
      {fields.map(({ control, name, id, placeholder, type }) => {
        return control ? (
          <FormField
            key={id}
            control={control}
            name={name}
            render={({ field }) => (
              <TextInput
                control={control}
                name={name}
                id={id}
                placeholder={placeholder}
                type={type}
                defaultValue={field.value}
              />
            )}
          />
        ) : null;
      })}
    </>
  );
};

export default FormFieldGenerator;
