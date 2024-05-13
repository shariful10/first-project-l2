import { Types } from "mongoose";

export type IDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};
