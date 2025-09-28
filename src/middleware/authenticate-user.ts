import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthenticationError from "../errors/AuthenticationError";
import config from "../config";


const authenticateUser = (req: Request, res: Response, next: NextFunction) => {

console.log("auth called");

  
  try {
    let token: string | undefined;

    // 1️⃣ First try cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
      console.log("token>>",token);
      
    }


    if (!token) {
      throw new AuthenticationError({
        message: "Authorization token missing",
        statusCode: 401,
        code: "ERR_AUTH",
      });
    }

    const decoded = jwt.verify(token, config.secretKey as string) as JwtPayload & {
      id: string;
      email: string;
      name: string;
      image: string;
      provider: string;
    };

    if (!decoded?.id) {
      throw new AuthenticationError({
        message: "Invalid or malformed token",
        statusCode: 401,
        code: "ERR_AUTH",
      });
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      image: decoded.image,
      provider: decoded.provider,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;




