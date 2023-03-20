const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellers",
        required: true,
    },
    img: {
        type: String,
        default: "default.png",
    },
});

const Products = mongoose.model("products", ProductsSchema);
module.exports = Products;
