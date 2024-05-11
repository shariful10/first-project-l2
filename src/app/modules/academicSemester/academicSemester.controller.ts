import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemisterServices } from "./academicSemester.service";

// create User
const createAcademecSemester = catchAsync(async (req, res) => {
  const result = await academicSemisterServices.createAcademicSemesterInfoDB(
    req.body,
  );

  sendResponse(res, {
    message: "Academic semister is created successfully!",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademecSemester,
};
