import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
  conversation: Types.ObjectId;
  question: string;
  answer: string;
}

const schema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);



const Message = mongoose.model<IMessage>("Message", schema);

export default Message;