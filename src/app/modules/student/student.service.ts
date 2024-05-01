import { StudentModel } from "../student.model";
import { IStudent } from "./student.interface";

const createStudentInfoDB = async (student: IStudent) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFronDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingeStudentFronDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentInfoDB,
  getAllStudentFronDB,
  getSingeStudentFronDB,
};
