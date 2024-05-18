import { z } from "zod";
import { UserStatus } from "./user.constance";

const ZUserSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be minimum 6 characters or more" })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
});

const ZChangeStatusSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]], {
      required_error: "Status is required",
    }),
  }),
});

export const userValidation = {
  ZUserSchema,
  ZChangeStatusSchema,
};
