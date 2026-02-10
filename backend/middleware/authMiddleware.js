const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Auth Middleware Decoded:", decoded);
        req.userId = decoded.userId;
        req.role = decoded.role ? decoded.role.toLowerCase() : null; // Normalize to lowercase
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })

    }
}