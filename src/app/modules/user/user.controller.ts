import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// create User
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createUserInfoDB(password, studentData);

  sendResponse(res, {
    message: "Student is created successfully!",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
