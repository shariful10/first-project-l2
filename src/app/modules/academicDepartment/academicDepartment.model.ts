/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
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

departmentSchema.pre("save", async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department is already exists!",
    );
  }
  next();
});

departmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  try {
    const isDepartmentExists = await AcademicDepartment.findOne(query);

    if (!isDepartmentExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This department does not exist!",
      );
    }
  } catch (err: any) {
    if (err.name === "CastError" && err.kind === "ObjectId") {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This department does not exist!",
      );
    } else {
      throw err;
    }
  }

  next();
});

export const AcademicDepartment = model<IDepartment>(
  "AcademicDepartment",
  departmentSchema,
);
