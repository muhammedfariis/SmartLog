import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "dispatcher", "driver" , "user"],
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model("authentications", AuthSchema);

export default Auth;
