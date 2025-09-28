import CustomError from "./CustomError";
import { ErrorCode } from "../types/types";

class BadRequestError extends CustomError<ErrorCode>{}

export default BadRequestError