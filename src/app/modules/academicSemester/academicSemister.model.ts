import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constance";
import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
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
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester already exists this year!",
    );
  }

  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
