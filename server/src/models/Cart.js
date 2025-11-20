// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["product", "combo"],
    required: true,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: null,
  },

  comboId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Combo",
    default: null,
  },

  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [cartItemSchema],

    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
