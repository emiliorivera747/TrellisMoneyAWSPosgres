import { z } from "zod";

export const addMemberFormSchema = z.object({
  email: z.string().email(),
});

export type AddMemberFormSchema = z.infer<typeof addMemberFormSchema>;
