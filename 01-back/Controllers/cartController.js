const Cart = require("./../Models/cartModel");
const catchAsync = require("./../Utils/catchAsync");
const AppError = require("./../Utils/appError");

exports.getAllCarts = catchAsync(async (req, res) => {
  const carts = await Cart.find();

  res.status(200).json({
    status: "success",
    results: carts.length,
    data: {
      carts,
    },
  });
});

// That route is for displaying the cart when user logges in the the site if needed
exports.findCartByUserID = catchAsync(async (req, res) => {
  const carts = await Cart.find({
    $and: [
      { customerID: { $eq: req.params.id } },
      { cartResolved: { $eq: false } },
    ],
  });

  res.status(200).json({
    status: "success",
    results: carts.length,
    data: {
      carts,
    },
  });
});

exports.createNewCart = catchAsync(async (req, res, next) => {
  console.log("Line 36");
  console.log(req.body);
  const newCart = await Cart.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }
  cart.__v = undefined;

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const cartResolved = true;
  console.log("cart is going to update");
  const cart = await Cart.findByIdAndUpdate(
    req.params.id,
    { cartResolved: cartResolved },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
