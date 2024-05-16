import mongoose from "mongoose";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import { IStudent } from "./student.interface";

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  console.log(query);
  const queryObj = { ...query };

  const studentSearchableFields = [
    "email",
    "name.firstName",
    "parmanentAddress",
  ];

  let searchTerm = "";

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const excludeField = ["searchTerm", "sort"];
  excludeField.forEach((el) => delete queryObj[el]);

  const filterquery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    })
    .select({ __v: 0 });

  let sort = "-createdAt";

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = await filterquery.sort(sort);

  return sortQuery;
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
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const isStudentExists = await Student.findOne({ id });

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found!");
  }

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingeStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
