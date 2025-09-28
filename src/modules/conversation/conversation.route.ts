import express, { Router } from "express";
import authenticateUser from "../../middleware/authenticate-user";
import { createConversation, getConversations,getConversationMessages } from "./conversation.controller";



const conversationRoutes:Router=express.Router()



conversationRoutes.post('/create-conversation',authenticateUser,createConversation)
conversationRoutes.get('/get-all-conversation',authenticateUser,getConversations)
conversationRoutes.get('/get-conversation-message/:id',authenticateUser,getConversationMessages)



export default conversationRoutes