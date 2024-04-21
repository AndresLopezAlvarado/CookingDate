import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
});

export default mongoose.model("Notification", notificationSchema);
