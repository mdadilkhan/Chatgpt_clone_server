import { Request,Response,NextFunction } from "express";
import * as userService from './user.service'
import AuthorizationError from "../../errors/AuthorizationError";
import EntityNotFoundError from "../../errors/EntityNotFoundError";



export const getUserDetails=async(req:Request,res:Response,next:NextFunction)=>{
    console.log("called");
    
    try {
        const user=req.user;
        console.log("user>>",user);


        if(!user || !user.id){
            throw new AuthorizationError({message:'Unauthorized',statusCode:401,code:'ERR_AUTH'})
        }
        
        const validUser = await userService.getUserById(user.id);

         console.log("validUSer>>",validUser);
         
        if(!validUser){
            throw new EntityNotFoundError({message:'user nto found',statusCode:400,code:'ERR_NF'})
        }

        const userData={
            _id:validUser._id || null,
            email:validUser.email || null,
            name:validUser.name || null,
            image:validUser.image || null,
            provider:validUser.provider || null
        }
        return res.status(200).json({message:"User detials fetched successfully",data:userData})
    } catch (error) {
        console.error(error);
        next(error)

    }
}


export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user=req.user;

        if(!user || !user.id){
          throw new AuthorizationError({message:'Unauthorized',statusCode:401,code:'ERR_AUTH'}) 
        }
        const data=await userService.getAllUsers(user.id);

           res.status(200).json({message:"Users retrived",data})
           
    } catch (error) {
        
    }
}