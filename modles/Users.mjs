import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.mjs";

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  username: String,
  token: String,
});

//  MAKING PASSWORD SECRIT
usersSchema.pre("save", function (next) {
  const user = this;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  next();
});

//  COMPARE PASSWORD WHEN USWER LOGIN
usersSchema.methods.comparePassword = function (password) {
  const user = this;

  return bcrypt.compareSync(password, user.password);
};

//  GENRATE TOKEN WHEN USER LOGIN
usersSchema.methods.generateToken = function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, jwtSecret);

  return token;
  // return { token, email: user.email };
};

const Users = mongoose.model("users", usersSchema);

export default Users;
