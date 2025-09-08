// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,   // snapshot of product name
        price: Number,  // snapshot of price
        quantity: Number,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    paymentMethod: { type: String, enum: ["UPI", "Card", "COD"], default: "COD" },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
