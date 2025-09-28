import {Request,Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import jwt,{ JwtPayload } from "jsonwebtoken";

import * as authService from './auth.service'
import BadRequestError from "../../errors/BadRequestError";
import EntityNotFoundError from "../../errors/EntityNotFoundError";
import ConflictError from "../../errors/ConflictError";
import config from "../../config";

export const userRegistration=async(req:Request,res:Response,next:NextFunction)=>{    
  console.log(req.body);
  
   try {
       const {name,email,password}=req.body

       if(!name || !email || !password){
          throw new BadRequestError({message:"All fields are required",statusCode:400,code:'ERR_BR'})
       }

       const existingUser=await authService.getUser(email,'manual')
       

       if(existingUser){
          throw new ConflictError({message:'user already registerd',statusCode:409,code:'ERR_CONFLICT'})
       }

       const hashedPassword=await bcrypt.hash(password,12)

      const user=await authService.createUser(email,name,hashedPassword,false)

    return res
      .status(200)
      .json({ message: "User Register successfully", data: user });
   } catch (error) {
      console.log(error);
       next(error);
   }
}


export const userLogin=async(req:Request,res:Response,next:NextFunction)=>{
    
    try {
      const {email,password}=req.body

      if(!email || !password){
        throw new BadRequestError({message:'all fields are required',statusCode:400,code:'ERR_BR'})
      }


      const user=await authService.getUser(email,'manual');
      
      if(!user || user?.isSocialLogin){
        throw new EntityNotFoundError({message:'user not found',statusCode:400,code:'ERR_NF'})
      }


      const isValidPassowrd= await bcrypt.compare(password,user.hashedPassword as string)

      if(!isValidPassowrd){
        throw new BadRequestError({message:'Password not set"',statusCode:400,code:'ERR_BR'})
      }

      const payload={
        id:user._id,
        name:user.name,
        email:user.email,
        image:user.image,
        provider:user.provider
      }
     const token=jwt.sign(payload,config.secretKey,{expiresIn:'1d'})
console.log(token);

     
     res.cookie('token',token,{
        httpOnly:true,
        secure:config.env==='production',
        sameSite: "lax", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
     })
     
     return res.status(200).json({ message: "Login Success"});
    } catch (error) {
        console.log(error);
        next(error)
    }
} 



export const socialLogin=async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body);
    
    try {
      const {name,email,provider,image}=req.body

      if(!name || !email){
        throw new BadRequestError({message:'all fields are required',statusCode:400,code:'ERR_BR'})
      }

      let user=await authService.getUser(email,provider)


      console.log("user>>",user);
      
      if(!user){
          user=await authService.createSocialAccountUser(name,email,provider,image)
      }
       const payload={
        id:user._id,
        name:user.name,
        email:user.email,
        image:user.image,
        provider:user.provider
      }
     const token=jwt.sign(payload,config.secretKey,{expiresIn:'1d'})

     console.log("token",token);
     
     res.cookie('token',token,{
        httpOnly:true,
        secure:config.env==='production',
        sameSite: "lax", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
     })

     return res.status(200).json({ message: "Login Success"});
        
    } catch (error) {
        console.log(error);
        next(error)
    }
}




export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
}

