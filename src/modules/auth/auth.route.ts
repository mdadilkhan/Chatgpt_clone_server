import express from 'express'
import { Router } from 'express'
import  {socialLogin,userLogin, userRegistration,logout} from './auth.controller'




const authRoutes:Router=express.Router()



authRoutes.post('/register',userRegistration)
authRoutes.post('/user-login',userLogin)
authRoutes.post('/social-login',socialLogin)
authRoutes.post('/logout',logout);



export default authRoutes