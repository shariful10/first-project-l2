import { Student } from "./student.model";

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    });
  return result;
};

const getSingeStudentFronDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    });
  return result;
};

const deleteStudentFronDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingeStudentFronDB,
  deleteStudentFronDB,
};
