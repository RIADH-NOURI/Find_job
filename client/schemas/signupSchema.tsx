import { z } from "zod";

export const schema = z
  .object({
    name: z.string().min(1, "username is required"),
    email: z.string().email("Email invalide").min(1, "email is required"),
    password: z.string().min(6, "password must be at least 6 characters"),
    confirmPassword: z.string(),
    dateOfBirth: z.string().min(1, "date of birth must be selected"),
    country: z.string().min(1, "country is required"),
    city: z.string().min(1, "city is required"),
    role: z.enum(["USER", "RECRUITER"], { message: "Role is required" }),
    status: z.string().optional(),
    company: z.string().optional(),
    companyType: z.string().optional(), 
    companySize: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => data.role === "USER" || (data.role === "RECRUITER" && data.company && data.companyType && data.companySize),
    {
      message: "Company and Company Type and Company Size are required for recruiters",
      path: ["company", "companyType", "companySize"],
    }
  )
  .refine(
    (data) => data.role === "RECRUITER" || (data.role === "USER" && data.status),
    {
      message: "Status is required for users",
      path: ["status"],
    }
  );

// Infer the type of the form data from the schema
export type FormData = z.infer<typeof schema>;