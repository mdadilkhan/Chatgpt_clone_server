import CustomError from "./CustomError";
import { ErrorCode } from "../types/types";

class ConflictError extends CustomError<ErrorCode>{}


export default ConflictError