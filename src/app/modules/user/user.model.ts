import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: [true, "ID is required"] },
    password: { type: String, required: [true, "Password is required"] },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ["admin", "student", "faculty"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
