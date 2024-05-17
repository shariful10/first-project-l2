import { Response } from "express";
import httpStatus from "http-status";

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

interface IResponse<I> {
  message?: string;
  meta?: IMeta;
  data: I;
}

const sendResponse = <I>(res: Response, data: IResponse<I>) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: data?.message,
    meta: data.meta,
    data: data?.data,
  });
};

export default sendResponse;
