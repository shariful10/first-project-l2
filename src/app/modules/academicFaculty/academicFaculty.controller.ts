import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createFacultyInfoDB,
  getAllFacultiesFromDB,
  getFacultyFromDB,
  upadateFacultyFromDB,
} from "./academicFaculty.service";

// create User
export const createFaculty = catchAsync(async (req, res) => {
  const result = await createFacultyInfoDB(req.body);

  sendResponse(res, {
    message: "Academic faculty is created successfully!",
    data: result,
  });
});

export const getAllFaculties = catchAsync(async (req, res) => {
  const result = await getAllFacultiesFromDB();

  sendResponse(res, {
    message: "Academic faculties fetched successfully!",
    data: result,
  });
});

export const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await getFacultyFromDB(facultyId);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Academic faculty not found!",
    });
  }

  sendResponse(res, {
    message: "Academic faculty fetched successfully!",
    data: result,
  });
});

export const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const updatedSemester = await upadateFacultyFromDB(facultyId, req.body);

  if (!updatedSemester) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Academic faculty not found!",
    });
  }

  sendResponse(res, {
    message: "Academic faculty updated successfully!",
    data: updatedSemester,
  });
});
