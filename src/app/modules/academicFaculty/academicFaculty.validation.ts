import { z } from "zod";

export const ZFacultySchema = z.object({
  name: z.string({
    required_error: "Academic faculty name is required",
    invalid_type_error: "Academic faculty name must be a string",
  }),
});
