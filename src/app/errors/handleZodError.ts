import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { IErrorSources, IGenericErrorRespnse } from "../interface/error";

export const handleZodError = (err: ZodError): IGenericErrorRespnse => {
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
