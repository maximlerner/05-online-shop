const express = require("express");

const router = express.Router();

const cartController = require("../Controllers/cartController");
const authController = require("../Controllers/authController");

router.get("/getAllCarts", cartController.getAllCarts);
router.get("/findCartByUserID/:id", cartController.findCartByUserID);
router.patch("/updateCart/:id", cartController.updateCart);

router.post("/createNewCart", cartController.createNewCart);
router.delete("/deleteCart/:id", cartController.deleteCart);

module.exports = router;
