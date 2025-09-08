// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["Clothing", "Jewelry", "Combo"],
      required: true,
    },
    subCategory: String,
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: [String],
    stock: { type: Number, required: true, default: 0 },
    sizes: [String], // Only for clothing
    colors: [String],
    tags: [String],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
