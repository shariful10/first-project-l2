import config from "../../config";
import { User } from "./user.model";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import AppError from "../../errors/AppError";
import { generateStudentId } from "./user.utils";
import { Student } from "../student/student.model";
import { IStudent } from "../student/student.interface";
import { AcademicSemester } from "../academicSemester/academicSemister.model";

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

  // Set generated ID
  userData.id = await generateStudentId(admissionSemester);

  // Create a user
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    // Set id & _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // Reference _id
    const newStudent = await Student.create(payload);
    return newStudent;
  }
  return newUser;
};

export const userServices = {
  createUserInfoDB,
};
