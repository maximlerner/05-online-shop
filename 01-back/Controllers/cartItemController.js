const CartItem = require("./../Models/cart-ItemModel");
const catchAsync = require("./../Utils/catchAsync");
const AppError = require("./../Utils/appError");

exports.getAllCartItems = catchAsync(async (req, res) => {
  const cartItems = await CartItem.find();

  res.status(200).json({
    status: "success",
    results: cartItems.length,
    data: {
      cartItems,
    },
  });
});

//3) that route will connect all cartItems to the specified cart
exports.findCartItemByCartID = catchAsync(async (req, res) => {
  const cartItems = await CartItem.find({ cartID: { $eq: req.params.id } });

  res.status(200).json({
    status: "success",
    results: cartItems.length,
    data: {
      cartItems,
    },
  });
});

exports.createCartItem = catchAsync(async (req, res, next) => {
  const newCartItem = await CartItem.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      cartItems: newCartItem,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Before updating document update totalItemPrice by pricePerItem * quantity
  cartItem.totalItemPrice = cartItem.pricePerItem * cartItem.quantity;
  await cartItem.save();

  if (!cartItem) {
    return next(new AppError("No item found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cartItem,
    },
  });
});

exports.deleteCartItem = catchAsync(async (req, res, next) => {
  const cartItem = await CartItem.findByIdAndDelete(req.params.id);

  if (!cartItem) {
    return next(new AppError("No item found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteCartItemsByDeletedCart = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const cartItem = await CartItem.deleteMany({
    cartID: { $eq: req.params.id },
  });

  if (!cartItem) {
    return next(new AppError("No items found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
