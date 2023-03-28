const jwt = require("jsonwebtoken");

const User = require("./../Models/userModel");
const catchAsync = require("./../Utils/catchAsync");
const AppError = require("./../Utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  console.log(token);

  // Remove the password from the output
  user.password = undefined;
  console.log(user);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fullName: req.body.fullName,
    id: req.body.id,
    email: req.body.email,
    userName: req.body.userName,
    city: req.body.city,
    street: req.body.street,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: "user",
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;

  // 1) Check if email && password exists!
  if (!userName || !password) {
    return next(new AppError("Please provide user Name and password", 400));
  }

  // 2) Check if user exists && password is correct!
  const user = await User.findOne({ userName }).select("+password");
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect user name or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
