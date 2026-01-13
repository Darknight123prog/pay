const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const { ConnectDB } = require("./Database/DB");
const PORT = process.env.PORT || 8890;

console.log("PORT:", PORT);

// 🔥 REQUIRED MIDDLEWARES
// console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin: process.env.FRONTEND_URL, // Vite frontend
  credentials: true
}));

app.use(express.json()); // <-- VERY IMPORTANT
app.use(express.urlencoded({ extended: true }));

// DB connection
ConnectDB();

// Test route
app.get("/", (req, res) => {
  res.send("welcome to the backend");
});

// Payment routes
app.use("/api/payment", require("./Routes/paymentRoutes"));


app.listen(PORT, () => {
  console.log(`Server is live `);
});
