import { Student } from "../student.model";
import { IStudent } from "./student.interface";

const createStudentInfoDB = async (studentData: IStudent) => {
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error("User already exists");
  }

  const result = await Student.create(studentData); // built in static method

  // const student = new Student(studentData); // create an instance

  // if (await student.isStudenExists(studentData.id)) {
  //   throw new Error("Student already exists!");
  // }

  // const result = await student.save(); // built in instant method
  return result;
};

const getAllStudentFronDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingeStudentFronDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFronDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentInfoDB,
  getAllStudentFronDB,
  getSingeStudentFronDB,
  deleteStudentFronDB,
};
