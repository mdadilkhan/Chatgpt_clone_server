import express from 'express'
import { Router } from 'express'
import authenticateUser from '../../middleware/authenticate-user'
import { getUserDetails,getAllUsers } from './user.controller'



const userRoutes:Router=express.Router()



userRoutes.get('/get-user-detials',authenticateUser,getUserDetails)
userRoutes.get('/get-all-users',authenticateUser,getAllUsers)


export default userRoutes