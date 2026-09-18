const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        loginId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["Student", "Faculty"],
            required: true
        },

        registerNumber: {
            type: String,
            default: ""
        },

        name: {
            type: String,
            default: ""
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);