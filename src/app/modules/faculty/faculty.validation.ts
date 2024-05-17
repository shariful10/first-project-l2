import { z } from "zod";
import { BloodGroup, Gender } from "./faculty.constant";

const ZCreateUserNameSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string({
    required_error: "Middle name is required",
    invalid_type_error: "Middle name must be a string",
  }),
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string",
  }),
});

export const ZCreateFacultySchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: "Password is required" })
      .max(20, { message: "Password can not be more than 20 caracters" }),
    faculty: z.object({
      designation: z.string({
        required_error: "Designation is required",
        invalid_type_error: "Designation must be a string",
      }),
      name: ZCreateUserNameSchema.required(),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: "Gender is required",
      }),
      dateOfBirth: z
        .string({ invalid_type_error: "Date of birth must be a string" })
        .optional(),
      email: z.string({ required_error: "Email is required" }).email(),
      contactNo: z.string({
        required_error: "Contact number is required",
        invalid_type_error: "Contact number must be a string",
      }),
      emergencyContactNo: z.string({
        required_error: "Emergency contact number is required",
        invalid_type_error: "Emergency contact number must be a string",
      }),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]], {
        required_error: "Blood group is required",
      }),
      presentAddress: z.string({
        required_error: "Present address is required",
        invalid_type_error: "Present address must be a string",
      }),
      permanentAddress: z.string({
        required_error: "Permanent address is required",
        invalid_type_error: "Permanent address must be a string",
      }),
      academicDepartment: z.string({
        required_error: "Academic department is required",
        invalid_type_error: "Academic department must be a string",
      }),
      // profileImg: z.string(),
    }),
  }),
});

const ZUpdateUserNameSchema = z.object({
  firstName: z
    .string({ invalid_type_error: "First name must be a string" })
    .min(1)
    .max(20, { message: "First name can not be more than 20 caracters" })
    .optional(),
  middleName: z
    .string({ invalid_type_error: "Middle name must be a string" })
    .optional(),
  lastName: z
    .string({ invalid_type_error: "Last name must be a string" })
    .optional(),
});

export const ZUpdateFacultySchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z
        .string({ invalid_type_error: "Designation must be a string" })
        .optional(),
      name: ZUpdateUserNameSchema,
      gender: z
        .enum([...Gender] as [string, ...string[]], {
          invalid_type_error: "Gender must be a string",
        })
        .optional(),
      dateOfBirth: z
        .string({ invalid_type_error: "Date of birth must be a string" })
        .optional(),
      email: z
        .string({
          invalid_type_error: "Email must be a string",
        })
        .email()
        .optional(),
      contactNo: z
        .string({
          invalid_type_error: "Contact Number must be a string",
        })
        .optional(),
      emergencyContactNo: z
        .string({
          invalid_type_error: "Emergency contact Number must be a string",
        })
        .optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z
        .string({
          invalid_type_error: "Present address must be a string",
        })
        .optional(),
      permanentAddress: z
        .string({
          invalid_type_error: "Permanent address must be a string",
        })
        .optional(),
      // profileImg: z.string().optional(),
      academicDepartment: z
        .string({ invalid_type_error: "Academic department must be a string" })
        .optional(),
    }),
  }),
});

export const studentValidations = {
  ZCreateFacultySchema,
  ZUpdateFacultySchema,
};
