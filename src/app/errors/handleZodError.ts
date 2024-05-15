import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { IErrorSources } from "../interface/error";

export const handleZodError = (err: ZodError) => {
  const errorSources: IErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};
