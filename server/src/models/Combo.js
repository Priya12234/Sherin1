// models/Combo.js
import mongoose from "mongoose";

const comboSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Combo", comboSchema);
