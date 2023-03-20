const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const Sellers = require("../models/Sellers");

module.exports = {
    verifySeller: (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(req.token, process.env.SECRET, (err, authData) => {
                if (err) {
                    console.log(err);
                } else {
                    Sellers.findById(authData.user.id).then((seller) => {
                        if (seller) {
                            req.user = seller.id;
                            next();
                        }
                    });
                }
            });
        } else {
            res.status(403).json({
                status: "failed",
                msg: "No Access Token Provided",
            });
        }
    },
    verifyUser: (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(req.token, process.env.SECRET, (err, authData) => {
                if (err) {
                    console.log(err);
                } else {
                    Users.findById(authData.user.id).then((user) => {
                        if (user) {
                            req.user = user.id;
                            next();
                        }
                    });
                }
            });
        } else {
            res.status(403).json({
                status: "failed",
                msg: "No Access Token Provided",
            });
        }
    },
};
