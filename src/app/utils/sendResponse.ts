import { Response } from "express";
import httpStatus from "http-status";

type IResponse<I> = {
  message?: string;
  data: I;
};

const sendResponse = <I>(res: Response, data: IResponse<I>) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: data?.message,
    data: data?.data,
  });
};

export default sendResponse;
