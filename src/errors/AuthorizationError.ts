import CustomError from "./CustomError";
import { ErrorCode } from "../types/types";


class AuthorizationError extends CustomError<ErrorCode>{}


export default AuthorizationError