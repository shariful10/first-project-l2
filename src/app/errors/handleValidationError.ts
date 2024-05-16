import mongoose from "mongoose";
import { IErrorSources, IGenericErrorRespnse } from "../interface/error";
import httpStatus from "http-status";

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorRespnse => {
  const errorSources: IErrorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errorSources,
  };
};
