"use server";
//Next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//External
import { z } from "zod";

//Utils
import { createClient } from "@/utils/supabase/server";

//Schema
import {
  signUpSchema,
  signInSchema,
} from "@/features/auth/schemas/formSchemas";
import { AuthError } from "@supabase/supabase-js";

const handleZodError = (e: unknown): State => {
  if (e instanceof z.ZodError) {
    return {
      status: "error",
      message: "Invalid form data",
      errors: e.issues.map((issue) => ({
        path: issue.path.join("."),
        message: `${issue.message}`,
      })),
    };
  }
  return { status: "error", message: "Unknown error", errors: e };
};

const handleOtherErrors = (e: unknown): State => {
  return {
    status: "error",
    message: "Something went wrong. Please try again.",
    errors: e.code,
  };
};

const handleSuccess = (formData: FormData): State => {
  return {
    status: "success",
    message: `Welcome, ${formData.get("email")}!`,
  };
};

export type State =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string | null;
      errors?:
        | Array<{
            path: string;
            message: string;
          }>
        | AuthError
        | unknown;
    }
  | null;

export async function login(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  try {
    const supabase = await createClient();

    /**
     * Validate the fields:
     *  - if the fields are invalid, we'll throw a ZodError
     *  - if the fields are valid, we'll return the validated fields
     */
    const validatedFields = signInSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const { data, error } = await supabase.auth.signInWithPassword(
      validatedFields
    );

    if (error) return handleOtherErrors(error) as State;

    // Add user to the database if they don't exist
    return handleSuccess(formData);
  } catch (e) {
    console.log(e);
    // In case of a ZodError (caused by our validation) we're adding issues to our response
    return handleZodError(e) as State || handleOtherErrors(e) as State;
  }
}

export async function signUp(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  try {
    const supabase = await createClient();

    const validatedFields = signUpSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    const { data, error } = await supabase.auth.signUp(
      validatedFields
    );

    if (error) return handleOtherErrors(error) as State;

    return handleSuccess(formData);
  } catch (e) {
    console.log("e: ", e);
    // In case of a ZodError (caused by our validation) we're adding issues to our response
    return handleZodError(e) as State || (handleOtherErrors(e) as State);
  }
}

export async function signOut() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }
  revalidatePath("/", "layout");
  return redirect("/");
}