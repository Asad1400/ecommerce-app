import express from "express";
import './db.js';
import cors from "cors";
import Order from "./Order.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/orders", async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, paymentMethod, totalPrice, items } = req.body;

    const newOrder = new Order({
      userName: customerName,
      userEmail: customerPhone, // if you have email, map correctly
      address: customerAddress,
      paymentMethod,
      totalPrice,
      items
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Order saved to DB!" });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "❌ Could not save order." });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
