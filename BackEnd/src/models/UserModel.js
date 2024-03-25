import mongoose from "mongoose";

const imagenSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    name: String,
    data: "Buffer",
    type: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    image: { url: String, public_id: String },
    images: { type: Map, of: imagenSchema },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
