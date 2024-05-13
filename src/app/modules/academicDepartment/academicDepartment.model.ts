import { Schema, model } from "mongoose";
import { IDepartment } from "./academicDepartment.interface";

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<IDepartment>(
  "AcademicFaculty",
  departmentSchema,
);
