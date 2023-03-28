const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: [true, "Please provide product ID"],
  },
  cartID: {
    type: String,
    required: [true, "Please provide cart ID"],
  },
  pricePerItem: {
    type: Number,
    required: [true, "Please specify item price"],
  },
  quantity: {
    type: Number,
    required: [true, "Please specify a quantity"],
  },
  totalItemPrice: {
    type: Number,
    default: 0,
  },
  cartItemID: {
    type: String,
  },
});

cartItemSchema.pre("save", function (next) {
  this.cartItemID = this._id;
  next();
});

// Set totalItemPrice before saving document
cartItemSchema.pre("save", function (next) {
  if (this.isModified("pricePerItem") && this.isModified("quantity")) {
    this.set({
      totalItemPrice: this.get("pricePerItem") * this.get("quantity"),
    });
    next();
  }
  next();
});

cartItemSchema.methods.changeTotalItemPrice = function (next) {
  if (this.isModified("pricePerItem") && this.isModified("quantity")) {
    this.set({
      totalItemPrice: this.get("pricePerItem") * this.get("quantity"),
    });
    next();
  }
  next();
};

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
