/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TErrorSources, TGenericErrorRespnse } from "../interface/error";

export const handleDuplicateError = (err: any): TGenericErrorRespnse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists!`,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: "Duplicate key value",
    errorSources,
  };
};
