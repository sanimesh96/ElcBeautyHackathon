const Users = require("../models/Users");
const Sellers = require("../models/Sellers");
const Orders = require("../models/Orders");
const Products = require("../models/Products");

module.exports = {
    getUserOrders: (req, res) => {
        id = req.user;
        let orders;
        Users.findById(id)
            .populate("orders")
            .then((user) => {
                orders = user.orders;
                res.json(orders);
            })
            .catch((err) => {
                res.status(404).json({ status: "failed", msg: "Not Found" });
            });
    },
    createOrder: (req, res) => {
        if (req.body.order && req.body.address) {
            let order = req.body.order;
            let address = req.body.address;
            let customer = req.user;
            let total = 0;
            order.forEach((or) => {
                Products.findById(or.product)
                    .then((product) => {
                        total += product.price * or.quantity;
                    })
                    .catch((err) => console.log(err));
            });

            let newOrder = new Orders({
                order,
                address,
                customer,
                total,
            });

            newOrder.save().then((or) => {
                Users.findById(customer, (err, user) => {
                    user.orders = [...user.orders, or];
                    user.save().then(() => {
                        res.json({
                            status: "success",
                            msg: "Order Successful",
                        });
                    });
                });
            });
        } else {
            res.status(403).json({ status: "failed", msg: "Bad Request" });
        }
    },
    getSellerOrders: (req, res) => {
        id = req.user;
        let sellerOrders = [];

        Orders.find().then((orders) => {
            orders.forEach((order) => {
                order.order.forEach((or) => {
                    if (or.seller == id) {
                        sellerOrders = [...sellerOrders, or];
                    }
                });
            });
            res.json({
                sellerOrders,
            });
        });
    },
};
