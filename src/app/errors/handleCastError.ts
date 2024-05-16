import mongoose from "mongoose";
import { IErrorSources, IGenericErrorRespnse } from "../interface/error";

export const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorRespnse => {
  const errorSources: IErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};
