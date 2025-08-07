import express from "express";
import jwt from "jsonwebtoken";
import Order from "./Order.js";

const router = express.Router();

// ✅ Track orders via phone number
router.get("/track-by-phone", async (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const orders = await Order.find({ userPhone: phone }).sort({ orderDate: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ New route: Get orders by user ID (used by frontend)
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by user ID:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Existing route for JWT-protected users
router.get("/history", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized - No token found" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "yourSecretKey"); // replace with your real secret
    const userId = decoded.userId;

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching order history:", error.message);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
});

export default router;
