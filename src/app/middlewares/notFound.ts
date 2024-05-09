/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    status: false,
    message: "APT not found!",
    error: {
      code: httpStatus.NOT_FOUND,
      message: httpStatus["404_MESSAGE"],
    },
  });
};

export default notFound;
