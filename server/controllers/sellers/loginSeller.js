const Sellers = require("../../models/Sellers");
const { generateToken } = require("../jwt");

module.exports = (req, res) => {
    if (req.body.email && req.body.password) {
        email = req.body.email;
        password = req.body.password;

        Sellers.findOne({ email }).then((seller) => {
            if (seller) {
                seller.comparePassword(password, (err, isMatch) => {
                    if (err) console.log(err);
                    else if (isMatch) {
                        generateToken(seller).then((token) => {
                            res.json({
                                status: "success",
                                msg: "Seller logged in",
                                token,
                            });
                        });
                    } else {
                        res.status(403).json({
                            status: "failed",
                            msg: "Incorrect Password",
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    msg: "No Seller found",
                });
            }
        });
    } else {
        res.status(400).json({ status: "failed", msg: "Bad Request" });
    }
};
