import { z } from "zod";

export const addMemberFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email(),
});

/**
 * Type representing the inferred schema for adding a member form.
 * @export
 * @typedef {z.infer<typeof addMemberFormSchema>} AddMemberFormSchema
 */
export type AddMemberFormSchema = z.infer<typeof addMemberFormSchema>;
