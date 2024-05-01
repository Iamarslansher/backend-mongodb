import express from "express";
import Products from "../modles/Products.mjs";
import verfiytoken from "../middleware/verfiytoken.mjs";

const router = express.Router();

// localhost:3001/products
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.send({
      message: "Products fetch succefully",
      data: products,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//  lcocalhost:3001/products/add
router.post("/add", async (req, res) => {
  try {
    await Products.create(req.body);
    res.send({ message: "Product add succefully" });
  } catch (e) {
    res.send({ message: e.message });
  }
});

//  lcocalhost:3001/products/update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.send({ message: "not find" });
    }

    res.send({ message: "Product update  succefully" });
  } catch (error) {
    res.send(error);
  }
});

// lcocalhost:3001/products/delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Products.findByIdAndDelete(id);
    if (!result) {
      return res.send({ message: "not find this product" });
    }
    res.send({ message: "Product delete succefully" });
  } catch (error) {}
});

export default router;
