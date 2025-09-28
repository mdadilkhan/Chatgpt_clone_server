import { Request, Response, NextFunction } from "express";
import Conversation from "../conversation/conversation.model";
import Message from "./message.model";
import { GoogleGenAI } from "@google/genai";

// const GOOGLE_LLM_API_URL = "https://api.example.com/google-llm"; // replace with real LLM endpoint


const ai = new GoogleGenAI({}); // it reads API key from GEMINI_API_KEY env variable

export const generateAnswer = async (prompt: string): Promise<string> => {
    console.log("prompt>>",prompt);
    
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response);
    
    return response.text || "Sorry, I could not generate an answer.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I could not generate an answer.";
  }
};

export const saveMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { question } = req.body;

    if (!question) return res.status(400).json({ message: "Question is required" });

    // 🔹 Generate answer first
    const answer = await generateAnswer(question);

    // 🔹 Create message with both question + answer in one step
    const messageDoc = await Message.create({ conversation: id, question, answer });

    // 🔹 Push message into conversation
    await Conversation.findByIdAndUpdate(id, { $push: { messages: messageDoc._id } });

    res.status(200).json(messageDoc);
  } catch (error) {
    next(error);
  }
};