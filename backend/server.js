const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


/* =========================
   MIDDLEWARE
========================= */

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use(express.json({
    limit: "10mb"
}));

app.use(
    express.urlencoded({
        extended: true
    })
);


/* =========================
   ROUTES
========================= */

const studentRoutes =
    require("./routes/studentRoutes");

const authRoutes =
    require("./routes/authRoutes");

app.use(
    "/api/students",
    studentRoutes
);

app.use(
    "/api/auth",
    authRoutes
);


/* =========================
   HOME
========================= */

app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
            "Student Academic Personal and Career Profiling System API is running"
    });

});


/* =========================
   HEALTH
========================= */

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "Backend is running",

        database:
            mongoose.connection.readyState === 1
                ? "Connected"
                : "Disconnected"
    });

});


/* =========================
   404
========================= */

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "API route not found"
    });

});


/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });

});


/* =========================
   DATABASE
========================= */

const PORT =
    process.env.PORT || 5000;

const MONGO_URI =
    process.env.MONGO_URI;

if (!MONGO_URI) {

    console.error(
        "ERROR: MONGO_URI is not defined in .env"
    );

    process.exit(1);
}


mongoose
    .connect(MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        app.listen(PORT, () => {

            console.log(
                `Server running on http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.error(
            "MongoDB connection failed:"
        );

        console.error(error.message);

    });