/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface IGender {
  gender: "male" | "female" | "other";
}

export interface IBloodGroup {
  bloogGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
}

export interface IUserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IFaculty {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: IUserName;
  gender: IGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: IBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
}

export interface FacultyModel extends Model<IFaculty> {
  isUserExists(id: string): Promise<IFaculty | null>;
}
