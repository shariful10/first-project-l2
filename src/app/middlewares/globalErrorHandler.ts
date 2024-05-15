/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  type IErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSources: IErrorSource = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "zod error";
  }

  return res.status(statusCode).json({
    status: false,
    message,
    // errorSources,
    err,
  });
};

export default globalErrorHandler;
