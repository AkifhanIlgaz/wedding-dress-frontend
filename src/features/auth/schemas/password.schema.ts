import { z } from "zod";

export const passwordSchema = z
  .string("Please enter your password.")
  .min(8, "Your password must be at least 8 characters.");
