import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    internId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "intern"], default: "intern" }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
 