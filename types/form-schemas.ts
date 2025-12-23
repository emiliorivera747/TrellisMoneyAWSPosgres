import { z } from "zod";

export const addMemberFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email(),
});

export type AddMemberFormSchema = z.infer<typeof addMemberFormSchema>;
