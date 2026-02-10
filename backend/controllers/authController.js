const User = require("../models/User.js")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All Fields are Required" })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const user = await User.create({
            name, email, password, role
        })
        res.status(201).json({ message: "Signup Successful", user })

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: error.message || "Signup Failed" })

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid Credintials" })
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }

        );
        res.json({
            message: "Login Successful",
            token,
            role: user.role
        })

    } catch (error) {
        res.status(500).json({ message: "Login Failed" })

    }
}