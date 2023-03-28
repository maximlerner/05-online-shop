const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: [true, "Please provide customerID"],
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  cartID: {
    type: String,
  },
  // I use that parameter to later check if the user didn't close the cart properly on login
  cartResolved: {
    type: Boolean,
    default: false,
  },
});

cartSchema.pre("save", function (next) {
  this.cartID = this._id;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
