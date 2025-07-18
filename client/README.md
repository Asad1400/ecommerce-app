import express from "express";
import "./db.js"; // ✅ Import db.js to connect MongoDB
import pizzaModel from "./pizzaModel.js"; // ✅ Import your Pizza model
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// 🏠 Basic test route
app.get("/", (req, res) => {
  res.send("Server is running on Port: " + PORT);
});

// 🍕 Route to get all pizzas
app.get("/getPizzas", async (req, res) => {
  try {
    const pizzas = await pizzaModel.find({});
    res.send(pizzas);
  } catch (error) {
    res.status(500).send({ message: "Error Fetching pizzas" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
