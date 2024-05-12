import { z } from "zod";

export const ZFacultySchema = z.object({
  name: z.string({
    required_error: "Academic Faculty name is required",
    invalid_type_error: "Academic Faculty name must be a string",
  }),
});
