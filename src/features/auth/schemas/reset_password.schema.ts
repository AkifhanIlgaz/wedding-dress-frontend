import { z } from "zod";
import { passwordSchema } from "./password.schema";

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .strict();

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
