import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constance";
import { Schema, model } from "mongoose";
import { IAcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterName, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months, required: true },
    endMonth: { type: String, enum: Months, required: true },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemister.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new Error("Semester already exists this year!");
  }

  next();
});

export const AcademicSemister = model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
