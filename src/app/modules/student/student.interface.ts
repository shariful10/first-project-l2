/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

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
  user: Types.ObjectId;
  password: string;
  name: IName;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
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
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

// for creating static
export interface StudentModel extends Model<IStudent> {
  isStudentExists(id: string): Promise<IStudent | null>;
}

// for creating instance
// export type IStudentMethods = {
//   isStudentExists(id: string): Promise<IStudent | null>;
// };

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   IStudentMethods
// >;
