import { Schema, model } from "mongoose";
import { IFaculty } from "./academicFaculty.interface";

const facultySchema = new Schema<IFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<IFaculty>("Faculty", facultySchema);
