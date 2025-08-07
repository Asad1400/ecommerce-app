// client/server.js
import express from "express";
import "./db.js";
import cors from "cors";
import Order from "./Order.js";
import Review from "./Review.js";
import User from "./User.js";
import authRoutes from "./auth.js"; // Route for /api/auth/signup and /api/auth/login
import mongoose from "mongoose";
import { Types } from "mongoose";
import orderRoutes from "./orders.js"; // Adjust path if needed

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Auth Routes (no changes to path)
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes); 

app.get("/orders/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ error: "❌ Could not fetch orders." });
  }
});

// ✅ Order Route
app.post("/orders", async (req, res) => {
  console.log("📥 Received order request:", req.body);
  try {
    const {
      userId,
      customerName,
      customerPhone,
      customerAddress,
      paymentMethod,
      totalPrice,
      items,
    } = req.body;

    // ✅ 1. Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: "❌ userId is required." });
    }

    // ✅ 2. Check if userId is a valid ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "❌ Invalid userId format." });
    }

    // ✅ 3. (Optional) Check if user exists in DB
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "❌ User not found." });
    }

    // ✅ Create and save new order
    const newOrder = new Order({
      userId,
      userName: customerName,
      userPhone: customerPhone,
      address: customerAddress,
      paymentMethod,
      totalPrice,
      items,
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Order saved to DB!" });

  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ error: "❌ Could not save order." });
  }
});

// ✅ Review Submit Route
app.post("/reviews", async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const newReview = new Review({ name, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error("❌ Error saving review:", err);
    res.status(500).json({ error: "Could not save review." });
  }
});

// ✅ Review Fetch Route
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("❌ Error fetching reviews:", err);
    res.status(500).json({ error: "Could not fetch reviews." });
  }
});

// ✅ Cart Fetch Route (Fix for React frontend 404)
app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Example structure — replace with your actual Cart model if different
    const cartItems = await Order.find({ userId }); // You can replace this with Cart.find({ userId }) if you have a Cart model
    res.json(cartItems);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ error: "Could not fetch cart" });
  }
});
// ✅ Server Listen
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
