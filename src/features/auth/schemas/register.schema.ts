import { z } from "zod";
import { passwordSchema } from "./password.schema";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Please enter your first name.").max(50),
    lastName: z.string().min(1, "Please enter your last name.").max(50),
    email: z.email("Please enter a valid email address.").max(255),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .strict();

export type RegisterRequest = z.infer<typeof registerSchema>;
