const jwt = require('jsonwebtoken');
const FormData = require("../models/UserModel");

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login First"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (await FormData.findById(decoded._id)) {
            req.user = await FormData.findById(decoded._id);
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const isAuthenticatedAdmin = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login First"
            });
        }

        

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.isAdmin) {
            return res.status(401).json({
                success: false,
                message: "Access Denied!"
            });
        }
        if (await FormData.findById(decoded._id)) {
            req.user = await FormData.findById(decoded._id);
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = isAuthenticated;
module.exports = isAuthenticatedAdmin;