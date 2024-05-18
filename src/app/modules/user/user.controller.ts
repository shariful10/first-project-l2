import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// create User
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createUserInfoDB(password, studentData);

  sendResponse(res, {
    message: "Student is created successfully!",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    message: "Faculty is created successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
};
