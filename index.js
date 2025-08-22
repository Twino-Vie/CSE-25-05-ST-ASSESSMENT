// -------------------------
// 1. Dependencies
// -------------------------
require("dotenv").config(); // Load .env at the very top
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");


// -------------------------
// 2. Initialize Express
// -------------------------
const app = express();

// -------------------------
// 3. Middleware
// -------------------------
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json()); // parse JSON
app.use(express.static(path.join(__dirname, "public"))); // serve static files

// -------------------------
// 4. View Engine
// -------------------------
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// -------------------------
// 5. Routes
// -------------------------
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

// Root route → redirect to products
app.get("/", (req, res) => {
  res.redirect("/products/addproduct");
});

// -------------------------
// 6. MongoDB Connection
// -------------------------
if (!process.env.DATABASE) {
  console.error("Error: DATABASE environment variable is missing!");
  process.exit(1);
}

console.log("Connecting to MongoDB with URI:", process.env.DATABASE);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully to myproducts"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// -------------------------
// 7. Start Server
// -------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



