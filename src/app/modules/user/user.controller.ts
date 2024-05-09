import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";

// create User
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userServices.createUserInfoDB(password, studentData);
    sendResponse(res, {
      message: "Student is created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
