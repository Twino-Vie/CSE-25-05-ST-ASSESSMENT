const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  category: {
    type: String,
    required: true,
  
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  color: {
    type: String,
    required: true,
  
  },
  image: {
    type: String, // store image path or URL as text
    required: true
  },
  
});


module.exports = mongoose.model("Product", productSchema);

