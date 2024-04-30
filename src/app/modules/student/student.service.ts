import { StudentModel } from "../student.model";
import { IStudent } from "./student.interface";

const createStudentInfoDB = async (student: IStudent) => {
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  createStudentInfoDB,
};
