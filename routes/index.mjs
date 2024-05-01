import express from "express";
import products from "./products.mjs";
import users from "./users.mjs";

const router = express.Router();

router.use("/products", products);
router.use("/users", users);

export default router;
