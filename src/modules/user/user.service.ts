import { IUser } from "./user.model";
import User from "./user.model";


export const getUserById=async(id:string):Promise<IUser | null>=>{

    return await User.findById({_id:id})

}


export const getAllUsers=async (id:string):Promise<IUser[]>=>{

   return  await User.find({_id:{$ne:id}}).sort({createdAt:-1}).exec()

}

