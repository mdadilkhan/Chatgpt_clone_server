
import mongoose, { Document, Schema,Types } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  hashedPassword?: string; // for normal login
  provider?: "google" | "github" | "manual";
  providerId?: string; // googleId / githubId
  isSocialLogin: boolean; //not
  conversations: Types.ObjectId[]; // References Conversation
}

const schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: {type: String},
    hashedPassword: { type: String }, // only for credentials login
    provider: {
      type: String,
      enum: ["google-oauth2", "github", "manual"],
      default: "manual",
    },
    isSocialLogin: { type: Boolean, default: false },
    providerId: { type: String }, // store googleId or githubId
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
  },
  { timestamps: true }
);

schema.index({ email: 1, provider: 1 }, { unique: true, background: true });
const User = mongoose.model<IUser>("User", schema);

export default User;
