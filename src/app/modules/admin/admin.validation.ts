import { z } from "zod";
import { BloodGroup, Gender } from "./admin.constant";

const ZCreateUserNameSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .max(20, { message: "First name can not be more than 20 caracters" }),
  middleName: z
    .string({
      invalid_type_error: "Middle name must be a string",
    })
    .max(20, { message: "Middle name can not be more than 20 caracters" }),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .max(20, { message: "Last name can not be more than 20 caracters" }),
});

export const ZCreateAdminSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      designation: z.string({
        required_error: "Designation is required",
        invalid_type_error: "Designation must be a string",
      }),
      name: ZCreateUserNameSchema,
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: "Gender is requied",
        invalid_type_error: `Gender must be one of: ${Gender.join(", ")}`,
      }),
      dateOfBirth: z
        .string({ invalid_type_error: "Date of birth must be a string" })
        .optional(),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a email formate",
        })
        .email(),
      contactNo: z.string({
        required_error: "Contact no. is required",
        invalid_type_error: "Contact no. must be a string",
      }),
      emergencyContactNo: z.string({
        required_error: "Emergency contact no. is required",
        invalid_type_error: "Emergency contact no. must be a string",
      }),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]], {
        required_error: "Blood group is required",
        invalid_type_error: "Blood group must be a string",
      }),
      presentAddress: z.string({
        required_error: "Present address is required",
        invalid_type_error: "Present address must be a string",
      }),
      permanentAddress: z.string({
        required_error: "Permanent address is required",
        invalid_type_error: "Permanent address must be a string",
      }),
      // profileImg: z.string(),
    }),
  }),
});

const ZUpdateUserNameSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const ZUpdateAdminSchema = z.object({
  body: z.object({
    admin: z.object({
      name: ZUpdateUserNameSchema,
      designation: z.string().max(30).optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      // profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  ZCreateAdminSchema,
  ZUpdateAdminSchema,
};
