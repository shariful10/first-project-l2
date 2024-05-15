/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError, ZodIssue } from "zod";
import { ErrorRequestHandler } from "express";
import { IErrorSource } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  let errorSources: IErrorSource = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSources: IErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;

    return {
      statusCode,
      message: "Validation Error",
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    status: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
