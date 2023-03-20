const Users = require("../../models/Users");
const { generateToken } = require("../jwt");

module.exports = (req, res) => {
    if (req.body.email && req.body.password) {
        email = req.body.email;
        password = req.body.password;

        Users.findOne({ email }).then((user) => {
            if (user) {
                user.comparePassword(password, (err, isMatch) => {
                    if (err) console.log(err);
                    else if (isMatch) {
                        generateToken(user).then((token) => {
                            res.json({
                                status: "success",
                                msg: "User logged in",
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
                    msg: "No User found",
                });
            }
        });
    } else {
        res.status(400).json({ status: "failed", msg: "Bad Request" });
    }
};
