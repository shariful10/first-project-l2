import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

// get all student
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);

  sendResponse(res, {
    message: "Students are fetched successfully!",
    data: result,
  });
});

// get single student
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentServices.getSingeStudentFromDB(id);

  sendResponse(res, {
    message: "Student is fetched successfully!",
    data: result,
  });
});

// get single student
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    message: "Student is deleted successfully!",
    data: null,
  });
});

// update student
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    message: "Student is updated successfully!",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
