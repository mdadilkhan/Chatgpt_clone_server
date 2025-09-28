import express,{Request,Response,NextFunction} from 'express'
import { Router } from 'express'
import authRoutes from './auth/auth.route';
import userRoutes from './user/user.route';
import conversationRoutes from './conversation/conversation.route';
import messageRoutes from './message/message.route';



const api:Router=express.Router()


api.use('/auth',authRoutes)
api.use('/user',userRoutes)
api.use('/conv',conversationRoutes)
api.use('/msg',messageRoutes)


export default api;