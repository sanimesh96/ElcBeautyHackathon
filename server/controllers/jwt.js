const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: async (user) => {
        let payload = {
            user: {
                id: user.id,
            },
        };

        let token = await jwt.sign(payload, process.env.SECRET);
        return token;
    },
};
