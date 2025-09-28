// export type ErrorCode = "ERR_NF" | "ERR_VALID" | "ERR_BR" | "ERR_AUTH";

export type ErrorCode =
  | "ERR_NF"         // Not Found
  | "ERR_VALID"      // Validation Error
  | "ERR_BR"         // Bad Request
  | "ERR_AUTH"       // Authentication
  | "ERR_FORBIDDEN"  // Authorization / Forbidden
  | "ERR_CONFLICT"   // Conflict
  | "ERR_INTERNAL"  // Internal Server Error


interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image: string;
  provider:string;
}

export declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
