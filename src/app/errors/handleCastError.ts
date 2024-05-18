import mongoose from "mongoose";
import httpStatus from "http-status";
import { TErrorSources, TGenericErrorRespnse } from "../interface/error";

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorRespnse => {
  const errorSources: TErrorSources = [
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
