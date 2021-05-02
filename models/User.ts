import { model, Schema } from "mongoose";
import userTypes from "../data/userTypes";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    type: {
      type: String,
      enum: userTypes,
      default: "user",
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    isDefaultPassword: {
      type: Boolean,
      default: true,
    },
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
    },
  },
  { collection: "users", minimize: false, timestamps: true }
);

export default model("users", UserSchema);
