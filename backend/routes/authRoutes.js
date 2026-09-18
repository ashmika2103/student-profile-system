const express = require("express");
const router = express.Router();

const User = require("../models/User");


/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {
    try {
        const {
            loginId,
            password,
            role
        } = req.body;

        if (!loginId || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Login ID, password and role are required"
            });
        }

        const user = await User.findOne({
            loginId: loginId.trim(),
            role: role
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",

            user: {
                id: user._id,
                loginId: user.loginId,
                role: user.role,
                registerNumber: user.registerNumber,
                name: user.name
            }
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
});


/* =========================
   REGISTER USER
========================= */

router.post("/register", async (req, res) => {
    try {

        const {
            loginId,
            password,
            role,
            registerNumber,
            name
        } = req.body;

        if (!loginId || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Login ID, password and role are required"
            });
        }

        const existingUser = await User.findOne({
            loginId: loginId.trim()
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const user = new User({
            loginId: loginId.trim(),
            password,
            role,
            registerNumber: registerNumber || "",
            name: name || ""
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",

            user: {
                id: savedUser._id,
                loginId: savedUser.loginId,
                role: savedUser.role,
                registerNumber: savedUser.registerNumber,
                name: savedUser.name
            }
        });

    } catch (error) {

        console.error("Register error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }
});


module.exports = router;