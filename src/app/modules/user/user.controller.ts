import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";

// create User
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userServices.createUserInfoDB(password, studentData);

    res.status(200).json({
      success: true,
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
