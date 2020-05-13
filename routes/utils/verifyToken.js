const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res.json({ status: 401, message: "Access denied" });
    }

    try {
        const verified = jwt.verify(token, process.TOKEN_SECRET_KEY);
        req.user = verified;
        next();
    } catch {
        res.json({ status: 400, message: "Invalid token" });
    }
}