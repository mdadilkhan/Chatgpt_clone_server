import { Request, Response, NextFunction } from "express";
import config from "../config";
import CustomError from "../errors/CustomError";
import { getErrorMessage } from "../utils";

export default function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent || config.debug) {
    next(error);
    return;
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });
     return; 
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(error) ||
        "An error occured. Please view logs for more details. ",
    },
  });
}
