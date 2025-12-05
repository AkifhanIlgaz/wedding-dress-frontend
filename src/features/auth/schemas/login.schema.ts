import { z } from "zod";
import { passwordSchema } from "./password.schema";

export const loginSchema = z
  .object({
    email: z.email("Please enter a valid email address.").max(255),
    password: passwordSchema,
  })
  .strict();

export type LoginRequest = z.infer<typeof loginSchema>;
