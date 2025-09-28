import BadRequestError from "../../errors/BadRequestError";
import Conversation from "./conversation.model";
import { Types } from "mongoose";
import User from "../user/user.model";

// ✅ Create empty conversation and push ID to user
export const createEmptyConversation = async (userId: string) => {
  // 1️⃣ Create conversation doc with placeholder title
  const conversation = await Conversation.create({
    user: userId,
    title: "New Conversation", // placeholder, optional
    messages: [],
  });

  // 2️⃣ Push conversation ID to user's conversations array
  await User.findByIdAndUpdate(userId, {
    $push: { conversations: conversation._id },
  });

  // 3️⃣ Return conversation ID
  return conversation._id;
};



export const getConversations = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: "conversations",
    populate: { path: "messages" },
  });

  if (!user) throw new Error("User not found");

  return user.conversations;
};