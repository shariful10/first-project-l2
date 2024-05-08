import { z } from "zod";

const ZNameSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "Fast name must be a string",
    })
    .max(20, { message: "First name can not be more than 20 caracters" }),
  middleName: z
    .string({ invalid_type_error: "Middle name must be a string" })
    .max(20, { message: "Last name can not be more than 20 caracters" })
    .optional(),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .max(20, { message: "Last name can not be more than 20 caracters" }),
});

const ZGuardianSchema = z.object({
  fatherName: z
    .string({
      required_error: "Father's name is required",
      invalid_type_error: "Father's name must be a string",
    })
    .max(60, { message: "Fater's name can not be more than 60 caracters" }),
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
    .max(60, { message: "Mother's name can not be more than 60 caracters" }),
  motherOccupation: z.string({
    required_error: "Mother's occupation is required",
    invalid_type_error: "Mother's occupation must be a string",
  }),
  motherContactNo: z
    .string({ required_error: "Mother's contact number is required" })
    .min(1),
});

const ZLocalGuardianSchema = z.object({
  name: z
    .string({
      required_error: "Local guardian name is required",
      invalid_type_error: "Local guardian name must be a string",
    })
    .max(20, {
      message: "Local guardian name can not be more than 60 caracters",
    }),
  occupation: z.string({
    required_error: "Local guardian occupation is required",
    invalid_type_error: "Local guardian occupation must be a string",
  }),
  contactNo: z
    .string({ required_error: "Local guardian contact number is required" })
    .min(11, { message: "Contact number must be minimum 11 caracters" })
    .max(11, { message: "Contact number can not be more than 11 caracters" }),
  address: z.string({ required_error: "Local guardian address is required" }),
});

const ZStudentSchema = z.object({
  id: z.string({ required_error: "Id is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be 6 caracters or more" })
    .max(20, { message: "Password can not be more than 30 caracters" }),
  name: ZNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z
    .string({ invalid_type_error: "Date of birth type must be a string" })
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  contactNo: z
    .string({ required_error: "Contact number is required" })
    .min(11)
    .max(11),
  emergencycontactNo: z
    .string({ required_error: "Emergency contact number is required" })
    .min(1)
    .max(11),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string({ required_error: "Present address is required" }),
  parmanentAddress: z.string({
    required_error: "Parmanent address is required",
  }),
  guardian: ZGuardianSchema,
  localGuardian: ZLocalGuardianSchema,
  profileImg: z
    .string({ invalid_type_error: "Profile url must be a string" })
    .optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean(),
});

export default ZStudentSchema;
