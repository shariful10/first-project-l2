import mongoose from "mongoose";
import httpStatus from "http-status";
import { TErrorSources, TGenericErrorRespnse } from "../interface/error";

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorRespnse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
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
