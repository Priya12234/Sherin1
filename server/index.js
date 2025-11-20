import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import comboRoutes from "./src/routes/comboRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // body parser
app.use(cors());
// app.use(morgan());

app.get("/", (req, res) => {
  res.send("Sherin API is running...");
});

// All routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/combos", comboRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port http://localhost:${PORT}`)
);
