import { z } from "zod";
import { BloodGroup, Gender } from "./student.constance";

const ZNameSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "Fast name must be a string",
    })
    .max(20, { message: "First name can not be more than 20 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First name must be start with capital letter",
    }),
  middleName: z
    .string({ invalid_type_error: "Middle name must be a string" })
    .max(20, { message: "Last name can not be more than 20 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Middle name must be start with capital letter",
    })
    .optional(),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .max(20, { message: "Last name can not be more than 20 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Last name must be start with capital letter",
    }),
});
const ZUpdateNameSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "Fast name must be a string",
    })
    .max(20, { message: "First name can not be more than 20 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First name must be start with capital letter",
    })
    .optional(),
  middleName: z
    .string({ invalid_type_error: "Middle name must be a string" })
    .max(20, { message: "Last name can not be more than 20 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Middle name must be start with capital letter",
    })
    .optional(),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .max(20, { message: "Last name can not be more than 20 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Last name must be start with capital letter",
    })
    .optional(),
});

const ZGuardianSchema = z.object({
  fatherName: z
    .string({
      required_error: "Father's name is required",
      invalid_type_error: "Father's name must be a string",
    })
    .max(60, { message: "Fater's name can not be more than 60 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Father's name must be start with capital letter",
    }),
  fatherOccupation: z.string({
    required_error: "Father's occupation is required",
    invalid_type_error: "Father's occupation must be a string",
  }),
  fatherContactNo: z.string({
    required_error: "Father's contact number is required",
  }),
  motherName: z
    .string({
      required_error: "Mother's name is required",
      invalid_type_error: "Mother's name must be a string",
    })
    .max(60, { message: "Mother's name can not be more than 60 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Mother's name must be start with capital letter",
    }),
  motherOccupation: z.string({
    required_error: "Mother's occupation is required",
    invalid_type_error: "Mother's occupation must be a string",
  }),
  motherContactNo: z.string({
    required_error: "Mother's contact number is required",
  }),
});

const ZUpdateGuardianSchema = z.object({
  fatherName: z
    .string({
      required_error: "Father's name is required",
      invalid_type_error: "Father's name must be a string",
    })
    .max(60, { message: "Fater's name can not be more than 60 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Father's name must be start with capital letter",
    })
    .optional(),
  fatherOccupation: z
    .string({
      required_error: "Father's occupation is required",
      invalid_type_error: "Father's occupation must be a string",
    })
    .optional(),
  fatherContactNo: z
    .string({
      required_error: "Father's contact number is required",
    })
    .optional(),
  motherName: z
    .string({
      required_error: "Mother's name is required",
      invalid_type_error: "Mother's name must be a string",
    })
    .max(60, { message: "Mother's name can not be more than 60 caracters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Mother's name must be start with capital letter",
    })
    .optional(),
  motherOccupation: z
    .string({
      required_error: "Mother's occupation is required",
      invalid_type_error: "Mother's occupation must be a string",
    })
    .optional(),
  motherContactNo: z
    .string({
      required_error: "Mother's contact number is required",
    })
    .optional(),
});

const ZLocalGuardianSchema = z.object({
  name: z
    .string({
      required_error: "Local guardian name is required",
      invalid_type_error: "Local guardian name must be a string",
    })
    .max(20, {
      message: "Local guardian name can not be more than 60 caracters",
    })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Local guardian name must be start with capital letter",
    }),
  occupation: z.string({
    required_error: "Local guardian occupation is required",
    invalid_type_error: "Local guardian occupation must be a string",
  }),
  contactNo: z.string({
    required_error: "Local guardian contact number is required",
  }),
  address: z.string({ required_error: "Local guardian address is required" }),
});

const ZUpdateLocalGuardianSchema = z.object({
  name: z
    .string({
      required_error: "Local guardian name is required",
      invalid_type_error: "Local guardian name must be a string",
    })
    .max(20, {
      message: "Local guardian name can not be more than 60 caracters",
    })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "Local guardian name must be start with capital letter",
    })
    .optional(),
  occupation: z
    .string({
      required_error: "Local guardian occupation is required",
      invalid_type_error: "Local guardian occupation must be a string",
    })
    .optional(),
  contactNo: z
    .string({
      required_error: "Local guardian contact number is required",
    })
    .optional(),
  address: z
    .string({ required_error: "Local guardian address is required" })
    .optional(),
});

export const ZCreateStudent = z.object({
  body: z.object({
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be 6 caracters or more" })
      .max(20, { message: "Password can not be more than 30 caracters" }),
    student: z.object({
      name: ZNameSchema,
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: "Gender is requied",
      }),
      dateOfBirth: z
        .string({
          invalid_type_error: "Date of birth type must be a string",
        })
        .optional(),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid email address" }),
      contactNo: z.string({ required_error: "Contact number is required" }),
      emergencyContactNo: z.string({
        required_error: "Emergency contact number is required",
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]], {
        required_error: "Blood group is required",
        invalid_type_error: "Blood group must be a string",
      }),
      presentAddress: z.string({
        required_error: "Present address is required",
      }),
      permanentAddress: z.string({
        required_error: "Parmanent address is required",
      }),
      guardian: ZGuardianSchema,
      localGuardian: ZLocalGuardianSchema,
      profileImg: z.string({
        invalid_type_error: "Profile url must be a string",
      }),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

export const ZUpdateStudent = z.object({
  body: z.object({
    student: z.object({
      name: ZUpdateNameSchema.optional(),
      gender: z
        .enum(["male", "female", "other"], {
          required_error: "Gender is required",
        })
        .optional(),
      dateOfBirth: z
        .string({
          invalid_type_error: "Date of birth type must be a string",
        })
        .optional(),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid email address" })
        .optional(),
      contactNo: z
        .string({ required_error: "Contact number is required" })
        .optional(),
      emergencycontactNo: z
        .string({
          required_error: "Emergency contact number is required",
        })
        .optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z
        .string({
          required_error: "Present address is required",
        })
        .optional(),
      permanentAddress: z
        .string({
          required_error: "Parmanent address is required",
        })
        .optional(),
      guardian: ZUpdateGuardianSchema.optional(),
      localGuardian: ZUpdateLocalGuardianSchema.optional(),
      profileImg: z
        .string({
          invalid_type_error: "Profile url must be a string",
        })
        .optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentVelidations = {
  ZCreateStudent,
  ZUpdateStudent,
};
