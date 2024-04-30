import { Schema } from "mongoose";
import {
  IGurdian,
  ILocalGurdian,
  IName,
  IStudent,
} from "./student/student.interface";

const INameSchema = new Schema<IName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const IGuardianSchema = new Schema<IGurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const ILocalGuardianSchema = new Schema<ILocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<IStudent>({
  id: { type: String },
  name: INameSchema,
  gender: ["male", "female"],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencycontactNo: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  presentAddress: { type: String, required: true },
  parmanentAddress: { type: String, required: true },
  gurdian: IGuardianSchema,
  localGuardian: ILocalGuardianSchema,
  profileImg: { type: String },
  isActive: ["active", "blocked"],
});
