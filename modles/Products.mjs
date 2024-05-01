import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: String,
});

const Products = mongoose.model("Products", productsSchema);

export default Products;
