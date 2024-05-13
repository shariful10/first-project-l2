import { z } from "zod";

export const ZCreateDepartmentSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Academic Department name is required",
      invalid_type_error: "Academic Department name must be a string",
    }),
    academicFaculty: z.string({
      required_error: "Academic Department ID is required",
      invalid_type_error: "Academic Department ID must be a string",
    }),
  }),
});

export const ZUpdateDepartmentSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department name must be a string",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Department ID must be a string",
      })
      .optional(),
  }),
});
