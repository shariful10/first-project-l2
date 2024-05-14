import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

// get all student
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();

  sendResponse(res, {
    message: "Students are fetched successfully!",
    data: result,
  });
});

// get single student
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingeStudentFronDB(studentId);

  sendResponse(res, {
    message: "Student is fetched successfully!",
    data: result,
  });
});

// get single student
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFronDB(studentId);

  sendResponse(res, {
    message: "Student is deleted successfully!",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
