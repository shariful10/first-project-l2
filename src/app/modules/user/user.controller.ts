import { RequestHandler } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

// create User
const createStudent: RequestHandler = async (req, res, next) => {
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
