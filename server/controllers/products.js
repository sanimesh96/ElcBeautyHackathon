const Sellers = require("../models/Sellers");
const Products = require("../models/Products");
const Users = require("../models/Users");

module.exports = {
    getProductsBySeller: (req, res) => {
        id = req.user;
        let products;
        Sellers.findById(id)
            .populate("products")
            .then((seller) => {
                products = seller.products;
                res.json(products);
            })
            .catch((err) => {
                res.status(404).json({ status: "failed", msg: "Not Found" });
            });
    },
    getAllProducts: (req, res) => {
        Products.find({})
            .populate("seller")
            .then((products) => {
                res.json(products);
            });
    },
    addNewProduct: (req, res) => {
        if (req.body.name && req.body.price && req.body.stock) {
            let name = req.body.name;
            let price = req.body.price;
            let stock = req.body.stock;
            let seller = req.user;

            let newProduct = Products({
                name,
                price,
                stock,
                seller,
            });

            newProduct
                .save()
                .then((product) => {
                    let products = [];
                    Sellers.findById(seller, (err, sell) => {
                        products = sell.products;
                    }).then(() => {
                        Sellers.findByIdAndUpdate(
                            seller,
                            { products: [...products, product] },
                            () => {
                                res.json({
                                    status: "success",
                                    msg: "Product Added",
                                });
                            }
                        );
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        status: "failed",
                        msg: "Server Error",
                    });
                });
        } else {
            res.status(403).json({ status: "failed", msg: "Bad Request" });
        }
    },
};
