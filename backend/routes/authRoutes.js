const express = require("express");
const router = express.Router();

const User = require("../models/User");

// ============================================================
// STUDENT / FACULTY LOGIN
// ============================================================

router.post("/login", async (req, res) => {
    try {
        const { loginId, password, role } = req.body;

        // Check empty fields
        if (!loginId || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please enter Login ID, Password and Role."
            });
        }

        const cleanLoginId = loginId.trim();

        // Find user by Login ID and Role
        const user = await User.findOne({
            loginId: cleanLoginId,
            role: role
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials."
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials."
            });
        }

        // Successful login
        return res.json({
            success: true,
            message: "Login successful.",
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

        return res.status(500).json({
            success: false,
            message: "Server error during login."
        });
    }
});


// ============================================================
// STUDENT REGISTRATION
// ============================================================

router.post("/register", async (req, res) => {
    try {
        const {
            loginId,
            password,
            role,
            registerNumber,
            name
        } = req.body;

        // Check required fields
        if (
            !loginId ||
            !password ||
            !registerNumber ||
            !name
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Registration page should create Student accounts only
        if (role !== "Student") {
            return res.status(400).json({
                success: false,
                message: "Only Student registration is allowed."
            });
        }

        const cleanLoginId = loginId.trim();
        const cleanRegisterNumber = registerNumber.trim();
        const cleanName = name.trim();

        // Check whether account already exists
        const existingUser = await User.findOne({
            loginId: cleanLoginId
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "This Register Number is already registered."
            });
        }

        // Create new student login account
        const newUser = new User({
            loginId: cleanLoginId,
            password: password,
            role: "Student",
            registerNumber: cleanRegisterNumber,
            name: cleanName
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Student account created successfully.",
            user: {
                loginId: newUser.loginId,
                role: newUser.role,
                registerNumber: newUser.registerNumber,
                name: newUser.name
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        // Duplicate register number
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "This Register Number is already registered."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error during registration."
        });
    }
});


module.exports = router;