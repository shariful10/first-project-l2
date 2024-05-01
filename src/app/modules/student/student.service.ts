import { StudentModel } from "../student.model";
import { IStudent } from "./student.interface";

const createStudentInfoDB = async (studentData: IStudent) => {
  // const result = await StudentModel.create(student); // built in static method
  // return result;

  const student = new StudentModel(studentData);
  const result = await student.save(); // built in instant method
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
