const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
    {
        semester: {
            type: Number,
            required: true
        },
        percentage: {
            type: Number,
            default: 0
        },
        totalArrears: {
            type: Number,
            default: 0
        },
        clearedArrears: {
            type: Number,
            default: 0
        },
        subjects: {
            type: mongoose.Schema.Types.Mixed,
            default: []
        }
    },
    { _id: false }
);

const arrearSchema = new mongoose.Schema(
    {
        subjectCode: {
            type: String,
            default: ""
        },
        subjectName: {
            type: String,
            default: ""
        },
        semester: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: "Active"
        },
        attempt: {
            type: Number,
            default: 1
        }
    },
    { _id: false }
);

const studentSchema = new mongoose.Schema(
    {
        registerNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        dob: {
            type: String,
            default: ""
        },

        gender: {
            type: String,
            default: ""
        },

        department: {
            type: String,
            default: ""
        },

        section: {
            type: String,
            default: ""
        },

        collegeEmail: {
            type: String,
            default: ""
        },

        personalEmail: {
            type: String,
            default: ""
        },

        mobile: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

        studentType: {
            type: String,
            enum: ["Hosteller", "Day Scholar", ""],
            default: ""
        },

        hostelName: {
            type: String,
            default: ""
        },

        hostelRoom: {
            type: String,
            default: ""
        },

        distanceFromCollege: {
            type: Number,
            default: 0
        },

        familyDetails: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        semesterRecords: {
            type: [semesterSchema],
            default: []
        },

        hasArrears: {
            type: Boolean,
            default: false
        },

        arrears: {
            type: [arrearSchema],
            default: []
        },

        technicalProfile: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        selfEvaluation: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        careerGoal: {
            type: String,
            enum: [
                "Placement",
                "Higher Studies",
                "Entrepreneurship",
                ""
            ],
            default: ""
        },

        placementDetails: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        higherStudiesDetails: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        entrepreneurshipDetails: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        /*
         * IMPORTANT
         * CGPA is entered by FACULTY.
         * Student profile does not contain a CGPA input.
         */
        cgpa: {
            type: Number,
            default: 0,
            min: 0,
            max: 10
        },

        mentorRemarks: {
            type: String,
            default: ""
        },

        mentorStatus: {
            type: String,
            default: "Pending"
        }
    },

    {
        timestamps: true,
        strict: false
    }
);

module.exports = mongoose.model("Student", studentSchema);