import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    age: { type: Number, trim: true, required: true },
    breed: { type: String, trim: true, required: true },
    image: { url: String, public_id: String},
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);
