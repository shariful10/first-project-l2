import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorRespnse } from "../interface/error";

export const handleZodError = (err: ZodError): TGenericErrorRespnse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errorSources,
  };
};
