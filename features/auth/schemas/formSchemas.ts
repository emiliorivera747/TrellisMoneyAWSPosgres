import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(254, "Email cannot be longer than 254 characters")
    .refine((email) => {
      const [localPart] = email.split("@");
      return localPart.length <= 63;
    }, "Email local part cannot be longer than 63 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});


export const signInSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(254, "Email cannot be longer than 254 characters")
    .refine((email) => {
      const [localPart] = email.split("@");
      return localPart.length <= 63;
    }, "Email local part cannot be longer than 63 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});


export const recordSchema = z.object({
  record: z.object({
    email: z.string().email(),                // email should be a valid email address
    id: z.string(),                    // id should be a valid UUID
    raw_user_meta_data: z
      .object({
        name: z.string().optional(),           // name is optional
        email_verified: z.boolean().optional(), // email_verified is optional, default will be false if not provided
      })
      .optional(),
  }),
});

export type SignUpInputs = z.infer<typeof signUpSchema>;
export type SignInInputs = z.infer<typeof signInSchema>;
export type RecordSchema = z.infer<typeof recordSchema>;