/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";
import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

// get all student
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFronDB();
  sendResponse(res, {
    message: "Students are retrieved successfully!",
    data: result,
  });
});

// get single student
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingeStudentFronDB(studentId);
  sendResponse(res, {
    message: "Student is retrieved successfully!",
    data: result,
  });
});

// get single student
const deleteStudent = catchAsync(async (req, res, next) => {
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
