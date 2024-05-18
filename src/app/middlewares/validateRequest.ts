import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

// validation checking
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });

      return next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
