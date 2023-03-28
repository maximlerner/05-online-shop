const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: true,
    required: [true, "Please enter product name"],
  },
  category: {
    type: String,
    required: [true, "Please choose category name"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image"],
  },
  productID: {
    type: String,
  },
});

productSchema.pre("save", function (next) {
  this.productID = this._id;
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
