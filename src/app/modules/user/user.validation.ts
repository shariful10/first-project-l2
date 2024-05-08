import { z } from "zod";

const ZUserSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be a string" })
    .min(6, { message: "Password must be minimum 6 characters or more" })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
});

export const userValidation = {
  ZUserSchema,
};
