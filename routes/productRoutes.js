const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /products/addproduct → show form + product list
router.get("/addproduct", async (req, res) => {
  res.render("index");
  try {
    const products = await Product.find(); // get all products
    res.render("index", { products });     // pass products to Pug
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load products");
  }
});

// POST /products/addproduct → add new product
router.post("/addproduct", async (req, res) => {
  console.log("Received form data:");
  try {
    const { name, category, price, color, image } = req.body;

    if (!name || !category || !price || !color || !image) {
      return res.status(400).send("All fields are required");
    }
    const newProduct = new Product({
      name,
      category,
      price: Number(price),
      color,
      image
    });
    await newProduct.save();         // save to MongoDB
    res.render("/addproduct"); // redirect to refresh page
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to save to DB");
  }
});

module.exports = router;

