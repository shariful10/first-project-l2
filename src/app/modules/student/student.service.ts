import { Student } from "./student.model";

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
  getAllStudentFronDB,
  getSingeStudentFronDB,
  deleteStudentFronDB,
};
