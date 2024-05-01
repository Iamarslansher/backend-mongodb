import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.mjs";
import Users from "../modles/Users.mjs";

function verfiytoken(req, res, next) {
  try {
    return;
    const token = req.headers.authorization.slice(7);
    jwt.verify(token, jwtSecret);
    next();
  } catch (e) {
    res.send({ message: "Invalid Token" });
  }
}

export default verfiytoken;
