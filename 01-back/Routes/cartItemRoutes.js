const express = require("express");

const router = express.Router();

const cartIemController = require("../Controllers/cartItemController");
const authController = require("../Controllers/authController");

router.get("/getAllCartItems", cartIemController.getAllCartItems);
router.post("/createNewCartItem", cartIemController.createCartItem);
router.patch("/updateCartItem/:id", cartIemController.updateCartItem);
router.delete("/deleteCartItem/:id", cartIemController.deleteCartItem);
router.delete(
  "/deleteCartItemsByDeletedCart/:id",
  cartIemController.deleteCartItemsByDeletedCart
);

router.get("/findCartItemByCartID/:id", cartIemController.findCartItemByCartID);

module.exports = router;
