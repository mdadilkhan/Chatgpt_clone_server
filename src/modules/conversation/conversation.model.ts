import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IConversation extends Document {
  user: Types.ObjectId; // reference back to User
  messages: Types.ObjectId[]; // references Message
}

const schema = new Schema<IConversation>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);



const Conversation = mongoose.model<IConversation>("Conversation", schema);

export default Conversation;