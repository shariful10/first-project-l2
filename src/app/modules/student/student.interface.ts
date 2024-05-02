import { Model } from "mongoose";

export type IName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: IName;
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencycontactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  parmanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
};

export type IStudentMethods = {
  isStudenExists(id: string): Promise<IStudent | null>;
};

export type StudentModel = Model<
  IStudent,
  Record<string, never>,
  IStudentMethods
>;
