import mongoose from "mongoose";
import { IErrorSources, IGenericErrorRespnse } from "../interface/error";

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

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};
