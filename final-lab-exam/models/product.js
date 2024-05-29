// in model folder we develop a schema that how our data will be stored ie synatx of data

const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
    name: String,
    price: String,
    image: String,
    category: String,
});

let Product = mongoose.model("Product", productSchema);
module.exports = Product;