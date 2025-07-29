// client/server.js
import express from "express";
import "./db.js";
import cors from "cors";
import Order from "./Order.js";
import Review from "./Review.js";
import User from "./User.js";
import authRoutes from "./auth.js"; // Route for /api/auth/signup and /api/auth/login

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Auth Routes (no changes to path)
app.use("/api/auth", authRoutes);

// ✅ Order Route
app.post("/orders", async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, paymentMethod, totalPrice, items } = req.body;

    const newOrder = new Order({
      userName: customerName,
      userEmail: customerPhone,
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

// ✅ Server Listen
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
