import express, { Router } from "express";
import authenticateUser from "../../middleware/authenticate-user";
import {saveMessage} from './message.controller'



const messageRoutes:Router=express.Router()



messageRoutes.post('/save-message/:id',authenticateUser,saveMessage)
// messageRoutes.get('/get-all-conversation',authenticateUser,)
// messageRoutes.get('/get-conversation-message/:id',authenticateUser,)



export default messageRoutes