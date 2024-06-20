import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";

// create User
const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourse(req.body);

  sendResponse(res, {
    message: "Course is created successfully!",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    message: "Courses fetched successfully!",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.getSingleCourseFromDB(id);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Course not found!",
    });
  }

  sendResponse(res, {
    message: "Course fetched successfully!",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.deleteCourseFromDB(id);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: "Course not found!",
    });
  }

  sendResponse(res, {
    message: "Course deleted successfully!",
    data: result,
  });
});

// const updateCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;

//   const updatedFaculty = await courseServices.upadateFacultyFromDB(
//     id,
//     req.body,
//   );

//   if (!updatedFaculty) {
//     return res.status(httpStatus.NOT_FOUND).json({
//       statusCode: httpStatus.NOT_FOUND,
//       message: "Course not found!",
//     });
//   }

//   sendResponse(res, {
//     message: "Course updated successfully!",
//     data: updatedFaculty,
//   });
// });

export const CourseControllers = {
  createCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
};
