import { Request, Response, NextFunction } from "express";
import AuthorizationError from "../../errors/AuthorizationError";
import EntityNotFoundError from "../../errors/EntityNotFoundError";
import * as conversationService from "./conversation.service";
import Conversation from "./conversation.model";
import Message from "../message/message.model";

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const conversationId = await conversationService.createEmptyConversation(userId);

    res.status(201).json({
      message: "Conversation created",
      conversationId,
    });
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id; // get user id from request (assuming auth middleware sets it)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find conversations for the user that have at least one message
    const conversations = await Conversation.find({
      user: userId,
      messages: { $exists: true, $not: { $size: 0 } }, // messages array exists and not empty
    })
      .populate("messages") // optionally populate message details
      .sort({ updatedAt: -1 }); // sort by latest updated

    res.status(200).json({ conversations });
  } catch (error) {
    next(error);
  }
};

export const getConversationMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Find conversation and populate messages
    const conversation = await Conversation.findById(id).populate({
      path: "messages",
      model: Message,
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Only return messages
    res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    next(error);
  }
};