import { z } from "zod";

const ZNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20, { message: "First name can not be more than 20 caracters" }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .max(20, { message: "Last name can not be more than 20 caracters" }),
});

const ZGuardianSchema = z.object({
  fatherName: z.string().min(1).max(60),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1).max(60),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const ZLocalGuardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const ZStudentSchema = z.object({
  id: z.string().min(1),
  name: ZNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencycontactNo: z.string().min(1),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string().min(1),
  parmanentAddress: z.string().min(1),
  guardian: ZGuardianSchema,
  localGuardian: ZLocalGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
});

export default ZStudentSchema;
