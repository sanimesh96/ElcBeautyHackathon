const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
    order: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "sellers",
                required: true,
            },
        },
    ],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    address: {
        area: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pin: {
            type: Number,
            required: true,
        },
    },
});

const Orders = mongoose.model("orders", OrdersSchema);
module.exports = Orders;
