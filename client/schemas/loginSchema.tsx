import { z } from "zod";


export const loginSchema = z.object({
  email: z.string().min(1, "email is required").email("Email invalide"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;