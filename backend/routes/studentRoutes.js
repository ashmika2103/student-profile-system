const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


// ============================================================
// HELPER FUNCTION
// ============================================================

function escapeRegex(value) {

    return value.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

}


// ============================================================
// GET ALL STUDENTS
// GET /api/students
// ============================================================

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


        const filter = {};


        // ----------------------------------------------------
        // SEARCH
        // ----------------------------------------------------

        if (search && search.trim() !== "") {

            const searchValue =
                escapeRegex(
                    search.trim()
                );

            filter.$or = [

                {
                    name: {
                        $regex: searchValue,
                        $options: "i"
                    }
                },

                {
                    registerNumber: {
                        $regex: searchValue,
                        $options: "i"
                    }
                }

            ];

        }


        // ----------------------------------------------------
        // DEPARTMENT
        // ----------------------------------------------------

        if (
            department &&
            department.trim() !== ""
        ) {

            filter.department =
                department.trim();

        }


        // ----------------------------------------------------
        // SECTION
        // ----------------------------------------------------

        if (
            section &&
            section.trim() !== ""
        ) {

            filter.section =
                section.trim();

        }


        // ----------------------------------------------------
        // CATEGORY
        // ----------------------------------------------------

        if (
            category &&
            category.trim() !== ""
        ) {

            filter.category =
                category.trim();

        }


        // ----------------------------------------------------
        // CAREER GOAL
        // ----------------------------------------------------

        if (
            careerGoal &&
            careerGoal.trim() !== ""
        ) {

            filter.careerGoal =
                careerGoal.trim();

        }


        // ----------------------------------------------------
        // ARREAR STATUS
        // ----------------------------------------------------

        if (arrearStatus === "hasArrears") {

            filter.hasArrears = true;

        }

        else if (
            arrearStatus === "noArrears"
        ) {

            filter.hasArrears = false;

        }


        // ----------------------------------------------------
        // FIND STUDENTS
        // ----------------------------------------------------

        const students =
            await Student
                .find(filter)
                .sort({
                    name: 1
                });


        res.json({

            success: true,

            count: students.length,

            students: students

        });

    }

    catch (error) {

        console.error(
            "Get students error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to fetch students",

            error:
                error.message

        });

    }

});


// ============================================================
// GET STUDENT BY REGISTER NUMBER
// GET /api/students/register/24BCS034
// ============================================================

router.get(
    "/register/:registerNumber",
    async (req, res) => {

        try {

            const registerNumber =
                req.params.registerNumber
                    .trim();


            const student =
                await Student.findOne({

                    registerNumber: {

                        $regex:
                            `^${escapeRegex(
                                registerNumber
                            )}$`,

                        $options: "i"

                    }

                });


            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }


            res.json({

                success: true,

                student: student

            });

        }

        catch (error) {

            console.error(
                "Get student by register number error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to find student",

                error:
                    error.message

            });

        }

    }
);


// ============================================================
// GET STUDENT BY ID
// GET /api/students/:id
// ============================================================

router.get(
    "/:id",
    async (req, res) => {

        try {

            const student =
                await Student.findById(
                    req.params.id
                );


            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }


            res.json({

                success: true,

                student: student

            });

        }

        catch (error) {

            console.error(
                "Get student error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch student",

                error:
                    error.message

            });

        }

    }
);


// ============================================================
// CREATE STUDENT
// POST /api/students
// ============================================================

router.post(
    "/",
    async (req, res) => {

        try {

            const studentData =
                req.body;


            // ------------------------------------------------
            // CHECK REGISTER NUMBER
            // ------------------------------------------------

            if (
                !studentData.registerNumber
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Register number is required"

                });

            }


            // ------------------------------------------------
            // CHECK NAME
            // ------------------------------------------------

            if (
                !studentData.name
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Student name is required"

                });

            }


            // ------------------------------------------------
            // CHECK DUPLICATE
            // ------------------------------------------------

            const existingStudent =
                await Student.findOne({

                    registerNumber:
                        studentData
                            .registerNumber
                            .trim()

                });


            if (existingStudent) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Student with this register number already exists"

                });

            }


            // ------------------------------------------------
            // CREATE STUDENT
            // ------------------------------------------------

            const student =
                new Student(
                    studentData
                );


            const savedStudent =
                await student.save();


            res.status(201).json({

                success: true,

                message:
                    "Student created successfully",

                student:
                    savedStudent

            });

        }

        catch (error) {

            console.error(
                "Create student error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to create student",

                error:
                    error.message

            });

        }

    }
);


// ============================================================
// UPDATE STUDENT
// PUT /api/students/:id
//
// THIS IS THE IMPORTANT PART
// ============================================================

router.put(
    "/:id",
    async (req, res) => {

        try {

            console.log(
                "================================="
            );

            console.log(
                "UPDATE STUDENT REQUEST"
            );

            console.log(
                "Student ID:",
                req.params.id
            );

            console.log(
                "Received data:",
                req.body
            );

            console.log(
                "================================="
            );


            // ------------------------------------------------
            // FIND STUDENT
            // ------------------------------------------------

            const existingStudent =
                await Student.findById(
                    req.params.id
                );


            if (!existingStudent) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }


            // ------------------------------------------------
            // UPDATE CGPA
            // ------------------------------------------------

            if (
                req.body.cgpa !== undefined
            ) {

                const cgpa =
                    Number(
                        req.body.cgpa
                    );


                if (
                    Number.isNaN(cgpa) ||
                    cgpa < 0 ||
                    cgpa > 10
                ) {

                    return res.status(400).json({

                        success: false,

                        message:
                            "CGPA must be between 0 and 10"

                    });

                }


                // IMPORTANT:
                // CGPA is stored at ROOT LEVEL

                existingStudent.cgpa =
                    cgpa;

            }


            // ------------------------------------------------
            // UPDATE MENTOR REMARKS
            // ------------------------------------------------

            if (
                req.body.mentorRemarks !==
                undefined
            ) {

                existingStudent.mentorRemarks =
                    req.body.mentorRemarks;

            }


            // ------------------------------------------------
            // UPDATE MENTOR STATUS
            // ------------------------------------------------

            if (
                req.body.mentorStatus !==
                undefined
            ) {

                existingStudent.mentorStatus =
                    req.body.mentorStatus;

            }


            // ------------------------------------------------
            // UPDATE OTHER FIELDS
            // ------------------------------------------------

            const allowedFields = [

                "dob",
                "gender",
                "department",
                "section",
                "collegeEmail",
                "personalEmail",
                "mobile",
                "category",
                "address",
                "studentType",
                "hostelName",
                "hostelRoom",
                "distanceFromCollege",
                "familyDetails",
                "semesterRecords",
                "hasArrears",
                "arrears",
                "technicalProfile",
                "selfEvaluation",
                "careerGoal",
                "placementDetails",
                "higherStudiesDetails",
                "entrepreneurshipDetails",
                "additionalData"

            ];


            allowedFields.forEach(
                function (field) {

                    if (
                        req.body[field] !==
                        undefined
                    ) {

                        existingStudent[field] =
                            req.body[field];

                    }

                }
            );


            // ------------------------------------------------
            // SAVE UPDATED STUDENT
            // ------------------------------------------------

            const updatedStudent =
                await existingStudent.save();


            console.log(
                "Updated student successfully:"
            );

            console.log({

                id:
                    updatedStudent._id,

                registerNumber:
                    updatedStudent.registerNumber,

                name:
                    updatedStudent.name,

                cgpa:
                    updatedStudent.cgpa,

                mentorStatus:
                    updatedStudent.mentorStatus

            });


            // ------------------------------------------------
            // SEND RESPONSE
            // ------------------------------------------------

            res.json({

                success: true,

                message:
                    "Student updated successfully",

                student:
                    updatedStudent

            });

        }

        catch (error) {

            console.error(
                "Update student error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to update student",

                error:
                    error.message

            });

        }

    }
);


// ============================================================
// DELETE STUDENT
// DELETE /api/students/:id
// ============================================================

router.delete(
    "/:id",
    async (req, res) => {

        try {

            const student =
                await Student.findByIdAndDelete(
                    req.params.id
                );


            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Student deleted successfully",

                student:
                    student

            });

        }

        catch (error) {

            console.error(
                "Delete student error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to delete student",

                error:
                    error.message

            });

        }

    }
);


module.exports = router;