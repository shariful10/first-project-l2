import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { IStudent } from "./student.interface";

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    })
    .select({ __v: 0 });
  return result;
};

const getSingeStudentFromDB = async (id: string) => {
  const isStudentExists = await Student.findOne({ id });

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found!");
  }

  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    })
    .select({ __v: 0 });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const isStudentExists = await Student.findOne({ id });

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Feiled to delete user!");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
  const isStudentExists = await Student.findOne({ id });

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found!");
  }
  console.log("Updating student with ID:", id);
  console.log("Update payload:", payload);

  const result = await Student.findOneAndUpdate(
    { id },
    { $set: payload },
    { new: true },
  );
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingeStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
