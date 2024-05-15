import config from "../../config";
import { User } from "./user.model";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import AppError from "../../errors/AppError";
import { generateStudentId } from "./user.utils";
import { Student } from "../student/student.model";
import { IStudent } from "../student/student.interface";
import { AcademicSemester } from "../academicSemester/academicSemister.model";
import mongoose from "mongoose";

const createUserInfoDB = async (password: string, payload: IStudent) => {
  // Create a user object
  const userData: Partial<IUser> = {};

  // If password is not given, use a default password
  userData.password = password || (config.default_pass as string);

  //Set user role
  userData.role = "student";

  // find semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Set generated ID
    userData.id = await generateStudentId(admissionSemester);

    // Create a user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!");
    }

    // Set id & Reference _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
  }
};

export const userServices = {
  createUserInfoDB,
};
