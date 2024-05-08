import config from "../../config";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserInfoDB = async (password: string, studentData: IStudent) => {
  // Create a user object
  const userData: Partial<IUser> = {};

  // If password is not given, use a default password
  userData.password = password || (config.default_pass as string);

  //Set user role
  userData.role = "student";

  // Set manually generated ID
  userData.id = "2025100001";

  // Create a user
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    // Set id & _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // Reference _id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  return newUser;
};

export const userServices = {
  createUserInfoDB,
};
