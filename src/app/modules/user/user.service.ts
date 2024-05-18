/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { User } from "./user.model";
import httpStatus from "http-status";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import { Student } from "../student/student.model";
import { Faculty } from "../faculty/faculty.model";
import { TStudent } from "../student/student.interface";
import { TFaculty } from "../faculty/faculty.interface";
import { generateFacultyId, generateStudentId } from "./user.utils";
import { AcademicSemester } from "../academicSemester/academicSemister.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";

const createUserInfoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set faculty role
  userData.role = "faculty";
  //set faculty email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic department not found");
  }

  payload.academicFaculty = academicDepartment?.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // if (file) {
    //   const imageName = `${userData.id}${payload?.name?.firstName}`;
    //   const path = file?.path;
    //   //send image to cloudinary
    //   const { secure_url } = await sendImageToCloudinary(imageName, path);
    //   payload.profileImg = secure_url as string;
    // }

    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createUserInfoDB,
  createFacultyIntoDB,
};
