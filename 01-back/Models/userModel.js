const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  id: {
    type: Number,
    required: [true, "Please provide your id"],
    minlengh: 9,
    maxlength: 9,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  userName: {
    type: String,
    required: [true, "Please choose user name"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlengh: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "this field must match the password"],
    validate: {
      //This only works on Create and Save!!!
      //We use that function because we can't get this in arrow function
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  city: {
    type: String,
    required: [true, "Tell us what city you live in"],
  },
  street: {
    type: String,
    required: [true, "Tell us what street you live in"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  userID: String,
});

userSchema.pre("save", function (next) {
  this.userID = this._id;
  next();
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
