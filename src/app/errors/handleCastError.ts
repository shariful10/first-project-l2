import mongoose from "mongoose";
import { IErrorSources, IGenericErrorRespnse } from "../interface/error";
import httpStatus from "http-status";

export const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorRespnse => {
  const errorSources: IErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: "Invalid ID",
    errorSources,
  };
};
