import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemisterServices } from "./academicSemester.service";

// create User
const createSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createSemesterInfoDB(req.body);

  sendResponse(res, {
    message: "Academic semister is created successfully!",
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllSemestersFromDB();

  sendResponse(res, {
    message: "Academic Semesters are retrieved successfully!",
    data: result,
  });
});

const getSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await AcademicSemisterServices.getSemesterFromDB(semesterId);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Academic Semester not found!",
    });
  }

  sendResponse(res, {
    message: "Academic Semister is retrieved successfully!",
    data: result,
  });
});

const updateSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const updatedSemester = await AcademicSemisterServices.upadateSemesterFromDB(
    semesterId,
    req.body,
  );

  if (!updatedSemester) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Academic Semester not found!",
    });
  }

  sendResponse(res, {
    message: "Academic Semester updated successfully!",
    data: updatedSemester,
  });
});

export const AcademicSemesterControllers = {
  createSemester,
  getAllSemesters,
  getSemester,
  updateSemester,
};
