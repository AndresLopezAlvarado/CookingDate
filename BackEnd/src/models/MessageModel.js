import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
