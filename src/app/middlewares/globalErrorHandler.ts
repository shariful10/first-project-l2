/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || "Something went wrong!";

  return res.status(statusCode).json({
    status: false,
    message,
    error: {
      code: 404,
      message: err.errors || "Something went wrong!",
    },
  });
};

export default globalErrorHandler;
