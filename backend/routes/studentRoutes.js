const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


/* =========================
   CREATE STUDENT
========================= */

router.post("/", async (req, res) => {
    try {

        const studentData = req.body;

        if (!studentData.registerNumber) {
            return res.status(400).json({
                success: false,
                message: "Register number is required"
            });
        }

        if (!studentData.name) {
            return res.status(400).json({
                success: false,
                message: "Student name is required"
            });
        }

        const existingStudent = await Student.findOne({
            registerNumber: studentData.registerNumber
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Student with this register number already exists"
            });
        }

        const student = new Student(studentData);

        const savedStudent = await student.save();

        res.status(201).json({
            success: true,
            message: "Student profile created successfully",
            student: savedStudent
        });

    } catch (error) {

        console.error("Create student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
});


/* =========================
   GET ALL STUDENTS
========================= */

router.get("/", async (req, res) => {
    try {

        const {
            search,
            department,
            section,
            category,
            careerGoal,
            arrearStatus
        } = req.query;

        let filter = {};

        if (search) {

            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    registerNumber: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        if (department) {
            filter.department = department;
        }

        if (section) {
            filter.section = section;
        }

        if (category) {
            filter.category = category;
        }

        if (careerGoal) {
            filter.careerGoal = careerGoal;
        }

        if (arrearStatus === "hasArrears") {
            filter.hasArrears = true;
        }

        if (arrearStatus === "noArrears") {
            filter.hasArrears = false;
        }

        const students = await Student
            .find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {

        console.error("Get students error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message
        });
    }
});


/* =========================
   FIND BY REGISTER NUMBER
========================= */

router.get("/register/:registerNumber", async (req, res) => {
    try {

        const student = await Student.findOne({
            registerNumber: req.params.registerNumber
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            student
        });

    } catch (error) {

        console.error("Register search error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to find student",
            error: error.message
        });
    }
});


/* =========================
   GET STUDENT BY ID
========================= */

router.get("/:id", async (req, res) => {
    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            student
        });

    } catch (error) {

        console.error("Get student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch student",
            error: error.message
        });
    }
});


/* =========================
   UPDATE STUDENT
========================= */

router.put("/:id", async (req, res) => {
    try {

        const updatedStudent =
            await Student.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student profile updated successfully",
            student: updatedStudent
        });

    } catch (error) {

        console.error("Update student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update student",
            error: error.message
        });
    }
});


/* =========================
   DELETE STUDENT
========================= */

router.delete("/:id", async (req, res) => {
    try {

        const deletedStudent =
            await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {

        console.error("Delete student error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete student",
            error: error.message
        });
    }
});


module.exports = router;