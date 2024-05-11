import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constance";

export const ZCreateAcademicSemester = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
      required_error: "Academic semister name is required",
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      required_error: "Academic semister code is required",
    }),
    year: z.string({
      required_error: "Year is required",
      invalid_type_error: "Year must be a string",
    }),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: "Start month name is required",
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: "End month name is required",
    }),
  }),
});

export const academicSemesterValidation = {
  ZCreateAcademicSemester,
};
