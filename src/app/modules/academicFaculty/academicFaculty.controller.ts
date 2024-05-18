import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

// create User
const createFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createFacultyInfoDB(req.body);

  sendResponse(res, {
    message: "Academic faculty is created successfully!",
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllFacultiesFromDB();

  sendResponse(res, {
    message: "Academic faculties fetched successfully!",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result =
    await AcademicFacultyServices.getSingleFacultyFromDB(facultyId);

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

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const updatedFaculty = await AcademicFacultyServices.upadateFacultyFromDB(
    facultyId,
    req.body,
  );

  if (!updatedFaculty) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Academic faculty not found!",
    });
  }

  sendResponse(res, {
    message: "Academic faculty updated successfully!",
    data: updatedFaculty,
  });
});

export const AcademicFacultyControllers = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
};
