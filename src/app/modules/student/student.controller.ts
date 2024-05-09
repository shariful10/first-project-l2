import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";
import { NextFunction, Request, Response } from "express";

// get all student
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFronDB();
    sendResponse(res, {
      message: "Students are retrieved successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get single student
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingeStudentFronDB(studentId);
    sendResponse(res, {
      message: "Student is retrieved successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get single student
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFronDB(studentId);
    sendResponse(res, {
      message: "Student is deleted successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
