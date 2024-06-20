import { z } from "zod";

const ZPreRequisiteCoursesSchema = z.object({
  course: z.string({
    required_error: "Course is required",
    invalid_type_error: "Course must be a string",
  }),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be a string" })
    .optional(),
});

export const ZCreateCourseSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
    prefix: z.string({
      required_error: "Prefix is required",
      invalid_type_error: "Prefix must be a string",
    }),
    code: z.number({
      required_error: "Code is required",
      invalid_type_error: "Code must be a string",
    }),
    credits: z.number({
      required_error: "Credits is required",
      invalid_type_error: "Credits must be a string",
    }),
    preRequisiteCourses: z
      .array(ZPreRequisiteCoursesSchema, {
        required_error: "Pre Requisite Courses is required",
        invalid_type_error: "Pre Requisite Courses must be a array",
      })
      .optional(),
  }),
});
