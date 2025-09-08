import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    phone: { type: Number },
    address: [addressSchema],
  },
  { timestamps: true }
);
const User = mongoose.model("Users", userSchema);

export default User;
