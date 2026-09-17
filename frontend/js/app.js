/* =========================================================
   STUDENT PROFILING SYSTEM
   COMPLETE APP.JS
========================================================= */


/* =========================================================
   GLOBAL SETTINGS
========================================================= */

const STUDENT_LOGIN_ID = "24BCS034";
const STUDENT_PASSWORD = "student123";

const FACULTY_LOGIN_ID = "FAC001";
const FACULTY_PASSWORD = "faculty123";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeLogin();

    checkPageAccess();

    initializeStudentProfile();

    initializeStudentDashboard();

    initializeStudentsPage();

    initializeFacultyDashboard();

    initializeStudentView();

    initializeAddStudent();

    initializeNavigation();

});



/* =========================================================
   LOGIN
========================================================= */

function initializeLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.setAttribute(
        "novalidate",
        "novalidate"
    );

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearLoginErrors();

            const role =
                document.getElementById("role");

            const loginId =
                document.getElementById("loginId");

            const password =
                document.getElementById("password");

            let valid = true;


            /* ROLE VALIDATION */

            if (!role || role.value === "") {

                showLoginError(
                    role,
                    "Please select your role."
                );

                valid = false;
            }


            /* ID VALIDATION */

            if (
                !loginId ||
                loginId.value.trim() === ""
            ) {

                showLoginError(
                    loginId,
                    "Please enter your ID."
                );

                valid = false;
            }


            /* PASSWORD VALIDATION */

            if (
                !password ||
                password.value.trim() === ""
            ) {

                showLoginError(
                    password,
                    "Please enter your password."
                );

                valid = false;
            }


            if (!valid) {
                return;
            }


            const enteredRole =
                role.value;

            const enteredId =
                loginId.value.trim();

            const enteredPassword =
                password.value;


            /* STUDENT LOGIN */

            if (
                enteredRole === "student" &&
                enteredId.toUpperCase() ===
                STUDENT_LOGIN_ID &&
                enteredPassword ===
                STUDENT_PASSWORD
            ) {

                localStorage.setItem(
                    "userRole",
                    "student"
                );

                localStorage.setItem(
                    "loggedInUser",
                    enteredId
                );

                window.location.href =
                    "student-dashboard.html";

                return;
            }


            /* FACULTY LOGIN */

            if (
                enteredRole === "faculty" &&
                enteredId.toUpperCase() ===
                FACULTY_LOGIN_ID &&
                enteredPassword ===
                FACULTY_PASSWORD
            ) {

                localStorage.setItem(
                    "userRole",
                    "faculty"
                );

                localStorage.setItem(
                    "loggedInUser",
                    enteredId
                );

                window.location.href =
                    "faculty-dashboard.html";

                return;
            }


            /* INVALID LOGIN */

            const error =
                document.getElementById(
                    "loginError"
                );

            if (error) {

                error.textContent =
                    "Invalid role, ID or password.";

                error.style.display =
                    "block";
            }

        }
    );


    /* LIVE LOGIN VALIDATION */

    const fields =
        loginForm.querySelectorAll(
            "input, select"
        );


    fields.forEach(function (field) {

        field.addEventListener(
            "input",
            function () {

                if (
                    field.value.trim() !== ""
                ) {

                    removeLoginError(
                        field
                    );
                }

            }
        );


        field.addEventListener(
            "change",
            function () {

                if (
                    field.value.trim() !== ""
                ) {

                    removeLoginError(
                        field
                    );
                }

            }
        );

    });

}



/* =========================================================
   LOGIN ERROR FUNCTIONS
========================================================= */

function showLoginError(
    field,
    message
) {

    if (!field) {
        return;
    }


    field.classList.add(
        "input-error"
    );


    let error =
        field.parentElement.querySelector(
            ".error-message"
        );


    if (!error) {

        error =
            document.createElement(
                "small"
            );

        error.className =
            "error-message";

        field.parentElement.appendChild(
            error
        );
    }


    error.textContent =
        message;

    error.style.display =
        "block";
}


function removeLoginError(field) {

    if (!field) {
        return;
    }

    field.classList.remove(
        "input-error"
    );


    const error =
        field.parentElement.querySelector(
            ".error-message"
        );


    if (error) {
        error.remove();
    }

}


function clearLoginErrors() {

    const form =
        document.getElementById(
            "loginForm"
        );

    if (!form) {
        return;
    }


    form.querySelectorAll(
        ".input-error"
    ).forEach(function (field) {

        field.classList.remove(
            "input-error"
        );

    });


    form.querySelectorAll(
        ".error-message"
    ).forEach(function (error) {

        error.remove();

    });


    const error =
        document.getElementById(
            "loginError"
        );

    if (error) {

        error.textContent = "";

        error.style.display =
            "none";
    }

}



/* =========================================================
   PAGE ACCESS CONTROL
========================================================= */

function checkPageAccess() {

    const page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const role =
        localStorage.getItem(
            "userRole"
        );


    /* LOGIN PAGE */

    if (
        page === "" ||
        page === "index.html"
    ) {

        return;
    }


    /* IF NOT LOGGED IN */

    if (!role) {

        window.location.href =
            "index.html";

        return;
    }


    /* STUDENT ONLY PAGES */

    const studentPages = [

        "student-dashboard.html",

        "student-profile.html",

        "student-view.html"

    ];


    if (
        studentPages.includes(page) &&
        role !== "student"
    ) {

        window.location.href =
            "index.html";

        return;
    }


    /* FACULTY ONLY PAGES */

    const facultyPages = [

        "students.html",

        "faculty-dashboard.html",

        "add-student.html"

    ];


    if (
        facultyPages.includes(page) &&
        role !== "faculty"
    ) {

        window.location.href =
            "index.html";

        return;
    }

}



/* =========================================================
   STUDENT PROFILE
========================================================= */

function initializeStudentProfile() {

    const form =
        document.getElementById(
            "studentForm"
        );


    if (!form) {
        return;
    }


    /*
       IMPORTANT:
       Disable browser's default validation.

       Our JavaScript will show:
       RED BORDER
       RED ERROR MESSAGE
    */

    form.noValidate = true;

    form.setAttribute(
        "novalidate",
        "novalidate"
    );


    /* HOSTELLER / DAY SCHOLAR */

    setupResidenceFields();


    /* CAREER GOAL */

    setupCareerGoalFields();


    /* ADD SEMESTER */

    const addSemesterBtn =
        document.getElementById(
            "addSemesterBtn"
        );


    if (addSemesterBtn) {

        addSemesterBtn.addEventListener(
            "click",
            function () {

                addSemesterRow();

            }
        );

    }


    /* ADD ARREAR */

    const addArrearBtn =
        document.getElementById(
            "addArrearBtn"
        );


    if (addArrearBtn) {

        addArrearBtn.addEventListener(
            "click",
            function () {

                addArrearRow();

            }
        );

    }


    /* ARREAR STATUS */

    setupArrearStatus();


    /* FORM SUBMIT */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearAllValidationErrors();


            const valid =
                validateStudentForm();


            if (!valid) {

                showValidationMessage(
                    "Please fill all required fields correctly."
                );


                scrollToFirstError();

                return;
            }


            const studentData =
                collectStudentData();


            localStorage.setItem(
                "studentProfile",
                JSON.stringify(
                    studentData
                )
            );


            saveStudentToList(
                studentData
            );


            showSuccessMessage(
                "Student profile saved successfully!"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "student-dashboard.html";

                },
                1000
            );

        }
    );


    /* RESET */

    form.addEventListener(
        "reset",
        function () {

            setTimeout(
                function () {

                    clearAllValidationErrors();

                    setupResidenceFields();

                    setupCareerGoalFields();

                    setupArrearStatus();

                },
                50
            );

        }
    );


    /* LIVE VALIDATION */

    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(function (field) {


        field.addEventListener(
            "input",
            function () {

                validateSingleField(
                    field,
                    false
                );

            }
        );


        field.addEventListener(
            "change",
            function () {

                validateSingleField(
                    field,
                    true
                );

            }
        );


        field.addEventListener(
            "blur",
            function () {

                validateSingleField(
                    field,
                    true
                );

            }
        );

    });

}



/* =========================================================
   RESIDENCE FIELDS
========================================================= */

function setupResidenceFields() {

    const type =
        document.getElementById(
            "studentType"
        );


    if (!type) {
        return;
    }


    function updateResidence() {

        const value =
            type.value;


        const hostelSection =
            document.getElementById(
                "hostelSection"
            );


        const distanceSection =
            document.getElementById(
                "distanceSection"
            );


        if (hostelSection) {

            if (
                value.toLowerCase() ===
                "hosteller"
            ) {

                hostelSection.style.display =
                    "block";

            }
            else {

                hostelSection.style.display =
                    "none";

            }

        }


        if (distanceSection) {

            if (
                value.toLowerCase() ===
                "day scholar"
            ) {

                distanceSection.style.display =
                    "block";

            }
            else {

                distanceSection.style.display =
                    "none";

            }

        }

    }


    type.addEventListener(
        "change",
        updateResidence
    );


    updateResidence();

}



/* =========================================================
   CAREER GOAL FIELDS
========================================================= */

function setupCareerGoalFields() {

    const careerGoal =
        document.getElementById(
            "careerGoal"
        );


    if (!careerGoal) {
        return;
    }


    function updateCareerFields() {

        const value =
            careerGoal.value
                .toLowerCase();


        const placement =
            document.getElementById(
                "placementFields"
            );


        const higherStudies =
            document.getElementById(
                "higherStudiesFields"
            );


        const entrepreneurship =
            document.getElementById(
                "entrepreneurshipFields"
            );


        if (placement) {

            placement.style.display =
                value === "placement"
                    ? "block"
                    : "none";

        }


        if (higherStudies) {

            higherStudies.style.display =
                value ===
                "higher studies"
                    ? "block"
                    : "none";

        }


        if (entrepreneurship) {

            entrepreneurship.style.display =
                value ===
                "entrepreneurship"
                    ? "block"
                    : "none";

        }

    }


    careerGoal.addEventListener(
        "change",
        updateCareerFields
    );


    updateCareerFields();

}



/* =========================================================
   ARREAR STATUS
========================================================= */

function setupArrearStatus() {

    const hasArrears =
        document.getElementById(
            "hasArrears"
        );


    if (!hasArrears) {
        return;
    }


    function updateArrearSection() {

        const section =
            document.getElementById(
                "arrearSection"
            );


        if (!section) {
            return;
        }


        if (
            hasArrears.value === "Yes"
        ) {

            section.style.display =
                "block";

        }
        else {

            section.style.display =
                "none";

        }

    }


    hasArrears.addEventListener(
        "change",
        updateArrearSection
    );


    updateArrearSection();

}



/* =========================================================
   ADD SEMESTER ROW
========================================================= */

function addSemesterRow() {

    const container =
        document.getElementById(
            "semesterContainer"
        );


    if (!container) {
        return;
    }


    const count =
        container.children.length + 1;


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "dynamic-row semester-row";


    row.innerHTML = `

        <div class="form-group">

            <label>
                Semester *
            </label>

            <select
                name="semester[]"
                required
            >

                <option value="">
                    Select Semester
                </option>

                <option value="1">
                    Semester 1
                </option>

                <option value="2">
                    Semester 2
                </option>

                <option value="3">
                    Semester 3
                </option>

                <option value="4">
                    Semester 4
                </option>

                <option value="5">
                    Semester 5
                </option>

                <option value="6">
                    Semester 6
                </option>

                <option value="7">
                    Semester 7
                </option>

                <option value="8">
                    Semester 8
                </option>

            </select>

        </div>


        <div class="form-group">

            <label>
                SGPA *
            </label>

            <input
                type="number"
                name="sgpa[]"
                class="cgpa-field"
                min="0"
                max="10"
                step="0.01"
                placeholder="Enter SGPA"
                required
            >

        </div>


        <div class="form-group">

            <label>
                CGPA *
            </label>

            <input
                type="number"
                name="semesterCgpa[]"
                class="cgpa-field"
                min="0"
                max="10"
                step="0.01"
                placeholder="Enter CGPA"
                required
            >

        </div>


        <button
            type="button"
            class="remove-button"
            onclick="removeDynamicRow(this)"
        >
            Remove
        </button>

    `;


    container.appendChild(
        row
    );


    attachDynamicValidation(
        row
    );

}



/* =========================================================
   ADD ARREAR ROW
========================================================= */

function addArrearRow() {

    const container =
        document.getElementById(
            "arrearContainer"
        );


    if (!container) {
        return;
    }


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "dynamic-row arrear-row";


    row.innerHTML = `

        <div class="form-group">

            <label>
                Subject Code *
            </label>

            <input
                type="text"
                name="arrearSubjectCode[]"
                placeholder="Example: CS101"
                required
            >

        </div>


        <div class="form-group">

            <label>
                Subject Name *
            </label>

            <input
                type="text"
                name="arrearSubjectName[]"
                placeholder="Enter subject name"
                required
            >

        </div>


        <div class="form-group">

            <label>
                Status *
            </label>

            <select
                name="arrearStatus[]"
                required
            >

                <option value="">
                    Select Status
                </option>

                <option value="Active">
                    Active
                </option>

                <option value="Cleared">
                    Cleared
                </option>

            </select>

        </div>


        <button
            type="button"
            class="remove-button"
            onclick="removeDynamicRow(this)"
        >
            Remove
        </button>

    `;


    container.appendChild(
        row
    );


    attachDynamicValidation(
        row
    );

}



/* =========================================================
   REMOVE DYNAMIC ROW
========================================================= */

function removeDynamicRow(button) {

    if (!button) {
        return;
    }


    const row =
        button.closest(
            ".dynamic-row"
        );


    if (row) {

        row.remove();

    }

}



/* =========================================================
   DYNAMIC VALIDATION
========================================================= */

function attachDynamicValidation(
    container
) {

    const fields =
        container.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(function (field) {

        field.addEventListener(
            "input",
            function () {

                validateSingleField(
                    field,
                    false
                );

            }
        );


        field.addEventListener(
            "change",
            function () {

                validateSingleField(
                    field,
                    true
                );

            }
        );


        field.addEventListener(
            "blur",
            function () {

                validateSingleField(
                    field,
                    true
                );

            }
        );

    });

}



/* =========================================================
   VALIDATE COMPLETE STUDENT FORM
========================================================= */

function validateStudentForm() {

    const form =
        document.getElementById(
            "studentForm"
        );


    if (!form) {
        return true;
    }


    let isValid = true;


    clearAllValidationErrors();


    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(function (field) {

        if (
            !isFieldVisible(field)
        ) {
            return;
        }


        const valid =
            validateSingleField(
                field,
                true
            );


        if (!valid) {

            isValid = false;

        }

    });


    /* CAREER GOAL */

    const careerGoal =
        document.getElementById(
            "careerGoal"
        );


    if (
        careerGoal &&
        isFieldVisible(careerGoal) &&
        careerGoal.value.trim() === ""
    ) {

        showFieldError(
            careerGoal,
            "Please select your career goal."
        );

        isValid = false;
    }


    return isValid;

}



/* =========================================================
   VALIDATE SINGLE FIELD
========================================================= */

function validateSingleField(
    field,
    showRequired
) {

    if (!field) {
        return true;
    }


    if (
        !isFieldVisible(field)
    ) {

        removeFieldError(
            field
        );

        return true;
    }


    const value =
        (field.value || "").trim();


    const required =
        field.hasAttribute(
            "required"
        );


    /* EMPTY FIELD */

    if (value === "") {

        if (
            required &&
            showRequired
        ) {

            showFieldError(
                field,
                getRequiredMessage(field)
            );

            return false;
        }


        if (!required) {

            removeFieldError(
                field
            );

        }


        return !required;
    }



    /* REGISTER NUMBER */

    if (
        field.id ===
        "registerNumber"
    ) {

        const pattern =
            /^[0-9]{2}[A-Za-z]{2,5}[0-9]{3,6}$/;


        if (
            !pattern.test(value)
        ) {

            showFieldError(
                field,
                "Enter a valid register number."
            );

            return false;
        }

    }



    /* STUDENT NAME */

    if (
        field.id ===
        "studentName"
    ) {

        if (
            value.length < 2
        ) {

            showFieldError(
                field,
                "Student name must contain at least 2 characters."
            );

            return false;
        }

    }



    /* EMAIL */

    if (
        field.type === "email" ||
        field.id.toLowerCase().includes(
            "email"
        )
    ) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(value)
        ) {

            showFieldError(
                field,
                "Enter a valid email address."
            );

            return false;
        }

    }



    /* MOBILE */

    if (
        field.type === "tel" ||
        field.id ===
        "mobile" ||
        field.id ===
        "mobileNumber"
    ) {

        const mobile =
            value.replace(
                /\s/g,
                ""
            );


        if (
            !/^[6-9][0-9]{9}$/.test(
                mobile
            )
        ) {

            showFieldError(
                field,
                "Enter a valid 10-digit mobile number."
            );

            return false;
        }

    }



    /* DATE OF BIRTH */

    if (
        field.id === "dob"
    ) {

        const selectedDate =
            new Date(value);


        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        if (
            selectedDate > today
        ) {

            showFieldError(
                field,
                "Date of birth cannot be in the future."
            );

            return false;
        }

    }



    /* CGPA */

    if (
        field.classList.contains(
            "cgpa-field"
        ) ||
        field.id === "cgpa" ||
        field.name === "cgpa"
    ) {

        const cgpa =
            parseFloat(value);


        if (
            isNaN(cgpa) ||
            cgpa < 0 ||
            cgpa > 10
        ) {

            showFieldError(
                field,
                "CGPA must be between 0 and 10."
            );

            return false;
        }

    }



    /* PERCENTAGE */

    if (
        field.classList.contains(
            "percentage-field"
        ) ||
        field.id ===
        "percentage"
    ) {

        const percentage =
            parseFloat(value);


        if (
            isNaN(percentage) ||
            percentage < 0 ||
            percentage > 100
        ) {

            showFieldError(
                field,
                "Percentage must be between 0 and 100."
            );

            return false;
        }

    }



    /* NUMBER MIN / MAX */

    if (
        field.type === "number"
    ) {

        const number =
            parseFloat(value);


        if (
            isNaN(number)
        ) {

            showFieldError(
                field,
                "Please enter a valid number."
            );

            return false;
        }


        if (
            field.min !== "" &&
            number <
            parseFloat(field.min)
        ) {

            showFieldError(
                field,
                "Value must be at least " +
                field.min +
                "."
            );

            return false;
        }


        if (
            field.max !== "" &&
            number >
            parseFloat(field.max)
        ) {

            showFieldError(
                field,
                "Value must not exceed " +
                field.max +
                "."
            );

            return false;
        }

    }



    /* MIN LENGTH */

    if (
        field.minLength > 0 &&
        value.length <
        field.minLength
    ) {

        showFieldError(
            field,
            "Please enter at least " +
            field.minLength +
            " characters."
        );

        return false;
    }



    /* MAX LENGTH */

    if (
        field.maxLength > 0 &&
        value.length >
        field.maxLength
    ) {

        showFieldError(
            field,
            "Maximum " +
            field.maxLength +
            " characters allowed."
        );

        return false;
    }



    /* VALID */

    removeFieldError(
        field
    );


    return true;

}



/* =========================================================
   REQUIRED MESSAGE
========================================================= */

function getRequiredMessage(field) {

    const id =
        field.id || "";


    if (
        id === "registerNumber"
    ) {

        return "Register number is required.";

    }


    if (
        id === "studentName"
    ) {

        return "Student name is required.";

    }


    if (
        id === "dob"
    ) {

        return "Date of birth is required.";

    }


    if (
        id === "mobile" ||
        id === "mobileNumber"
    ) {

        return "Mobile number is required.";

    }


    if (
        id === "careerGoal"
    ) {

        return "Please select your career goal.";

    }


    if (
        field.tagName ===
        "SELECT"
    ) {

        return "Please select an option.";

    }


    return "This field is required.";

}



/* =========================================================
   CHECK FIELD VISIBILITY
========================================================= */

function isFieldVisible(field) {

    if (!field) {
        return false;
    }


    if (
        field.disabled
    ) {
        return false;
    }


    let element =
        field;


    while (
        element &&
        element !== document.body
    ) {

        const style =
            window.getComputedStyle(
                element
            );


        if (
            style.display === "none" ||
            style.visibility === "hidden"
        ) {

            return false;
        }


        element =
            element.parentElement;
    }


    return true;

}



/* =========================================================
   SHOW FIELD ERROR
========================================================= */

function showFieldError(
    field,
    message
) {

    if (!field) {
        return;
    }


    field.classList.add(
        "input-error"
    );


    field.setAttribute(
        "aria-invalid",
        "true"
    );


    const parent =
        field.parentElement;


    let error =
        parent.querySelector(
            ".error-message"
        );


    if (!error) {

        error =
            document.createElement(
                "small"
            );

        error.className =
            "error-message";

        parent.appendChild(
            error
        );

    }


    error.textContent =
        message;

    error.style.display =
        "block";

}



/* =========================================================
   REMOVE FIELD ERROR
========================================================= */

function removeFieldError(
    field
) {

    if (!field) {
        return;
    }


    field.classList.remove(
        "input-error"
    );


    field.removeAttribute(
        "aria-invalid"
    );


    const error =
        field.parentElement.querySelector(
            ".error-message"
        );


    if (error) {

        error.remove();

    }

}



/* =========================================================
   CLEAR ALL VALIDATION ERRORS
========================================================= */

function clearAllValidationErrors() {

    const form =
        document.getElementById(
            "studentForm"
        );


    if (!form) {
        return;
    }


    form.querySelectorAll(
        ".input-error"
    ).forEach(function (field) {

        field.classList.remove(
            "input-error"
        );

        field.removeAttribute(
            "aria-invalid"
        );

    });


    form.querySelectorAll(
        ".error-message"
    ).forEach(function (error) {

        error.remove();

    });


    const messages =
        form.querySelectorAll(
            ".validation-message, .success-message"
        );


    messages.forEach(function (message) {

        message.remove();

    });

}



/* =========================================================
   VALIDATION MESSAGE
========================================================= */

function showValidationMessage(
    message
) {

    const form =
        document.getElementById(
            "studentForm"
        );


    if (!form) {
        return;
    }


    const old =
        form.querySelector(
            ".validation-message"
        );


    if (old) {
        old.remove();
    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "validation-message";


    div.textContent =
        message;


    form.insertBefore(
        div,
        form.firstChild
    );

}



/* =========================================================
   SUCCESS MESSAGE
========================================================= */

function showSuccessMessage(
    message
) {

    const form =
        document.getElementById(
            "studentForm"
        );


    if (!form) {
        return;
    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "success-message";


    div.textContent =
        message;


    form.insertBefore(
        div,
        form.firstChild
    );

}



/* =========================================================
   SCROLL TO FIRST ERROR
========================================================= */

function scrollToFirstError() {

    const firstError =
        document.querySelector(
            "#studentForm .input-error"
        );


    if (!firstError) {
        return;
    }


    firstError.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    setTimeout(
        function () {

            firstError.focus();

        },
        400
    );

}



/* =========================================================
   COLLECT STUDENT DATA
========================================================= */

function collectStudentData() {

    const form =
        document.getElementById(
            "studentForm"
        );


    const data = {};


    if (!form) {
        return data;
    }


    const formData =
        new FormData(form);


    formData.forEach(
        function (value, key) {

            if (
                data[key] !== undefined
            ) {

                if (
                    !Array.isArray(
                        data[key]
                    )
                ) {

                    data[key] = [
                        data[key]
                    ];

                }

                data[key].push(
                    value
                );

            }
            else {

                data[key] = value;

            }

        }
    );


    /* DIRECT VALUES */

    const getValue =
        function (id) {

            const element =
                document.getElementById(
                    id
                );

            return element
                ? element.value.trim()
                : "";

        };


    data.registerNumber =
        getValue(
            "registerNumber"
        );


    data.studentName =
        getValue(
            "studentName"
        );


    data.dob =
        getValue(
            "dob"
        );


    data.gender =
        getValue(
            "gender"
        );


    data.department =
        getValue(
            "department"
        );


    data.section =
        getValue(
            "section"
        );


    data.institutionalEmail =
        getValue(
            "institutionalEmail"
        );


    data.personalEmail =
        getValue(
            "personalEmail"
        );


    data.mobile =
        getValue(
            "mobile"
        ) ||
        getValue(
            "mobileNumber"
        );


    data.category =
        getValue(
            "category"
        ) ||
        getValue(
            "studentCategory"
        );


    data.address =
        getValue(
            "address"
        ) ||
        getValue(
            "residentialAddress"
        );


    data.studentType =
        getValue(
            "studentType"
        );


    data.careerGoal =
        getValue(
            "careerGoal"
        );


    /* CGPA */

    const cgpaElement =
        document.getElementById(
            "cgpa"
        );


    if (cgpaElement) {

        data.cgpa =
            cgpaElement.value;

    }


    /* SEMESTERS */

    data.semesters =
        [];


    const semesterContainer =
        document.getElementById(
            "semesterContainer"
        );


    if (semesterContainer) {

        const rows =
            semesterContainer.querySelectorAll(
                ".semester-row"
            );


        rows.forEach(
            function (row) {

                const semester =
                    row.querySelector(
                        '[name="semester[]"]'
                    );


                const sgpa =
                    row.querySelector(
                        '[name="sgpa[]"]'
                    );


                const semesterCgpa =
                    row.querySelector(
                        '[name="semesterCgpa[]"]'
                    );


                data.semesters.push({

                    semester:
                        semester
                            ? semester.value
                            : "",

                    sgpa:
                        sgpa
                            ? sgpa.value
                            : "",

                    cgpa:
                        semesterCgpa
                            ? semesterCgpa.value
                            : ""

                });

            }
        );

    }


    /* ARREARS */

    data.arrears =
        [];


    const arrearContainer =
        document.getElementById(
            "arrearContainer"
        );


    if (arrearContainer) {

        const rows =
            arrearContainer.querySelectorAll(
                ".arrear-row"
            );


        rows.forEach(
            function (row) {

                const code =
                    row.querySelector(
                        '[name="arrearSubjectCode[]"]'
                    );


                const name =
                    row.querySelector(
                        '[name="arrearSubjectName[]"]'
                    );


                const status =
                    row.querySelector(
                        '[name="arrearStatus[]"]'
                    );


                data.arrears.push({

                    subjectCode:
                        code
                            ? code.value
                            : "",

                    subjectName:
                        name
                            ? name.value
                            : "",

                    status:
                        status
                            ? status.value
                            : ""

                });

            }
        );

    }


    data.updatedAt =
        new Date().toISOString();


    return data;

}



/* =========================================================
   SAVE STUDENT TO LIST
========================================================= */

function saveStudentToList(
    studentData
) {

    if (!studentData) {
        return;
    }


    let students = [];


    try {

        students =
            JSON.parse(
                localStorage.getItem(
                    "students"
                )
            ) || [];

    }
    catch (error) {

        students = [];

    }


    const registerNumber =
        studentData.registerNumber;


    const existingIndex =
        students.findIndex(
            function (student) {

                return (
                    student.registerNumber ===
                    registerNumber
                );

            }
        );


    if (
        existingIndex !== -1
    ) {

        students[
            existingIndex
        ] = studentData;

    }
    else {

        students.push(
            studentData
        );

    }


    localStorage.setItem(
        "students",
        JSON.stringify(
            students
        )
    );

}



/* =========================================================
   STUDENT DASHBOARD
========================================================= */

function initializeStudentDashboard() {

    const welcome =
        document.getElementById(
            "studentWelcome"
        );


    if (!welcome) {
        return;
    }


    const profile =
        getStudentProfile();


    if (!profile) {

        setDashboardText(
            "studentWelcome",
            "Welcome, Student"
        );

        return;
    }


    const name =
        profile.studentName ||
        profile.name ||
        "-";


    const registerNumber =
        profile.registerNumber ||
        "-";


    const department =
        profile.department ||
        "-";


    const section =
        profile.section ||
        "-";


    const category =
        profile.category ||
        profile.studentCategory ||
        "-";


    const studentType =
        profile.studentType ||
        "-";


    const careerGoal =
        profile.careerGoal ||
        "-";


    /* CGPA */

    let cgpa =
        profile.cgpa ||
        "-";


    if (
        cgpa === "-" &&
        Array.isArray(
            profile.semesters
        )
    ) {

        const values =
            profile.semesters
                .map(
                    function (semester) {

                        return parseFloat(
                            semester.cgpa
                        );

                    }
                )
                .filter(
                    function (value) {

                        return !isNaN(
                            value
                        );

                    }
                );


        if (values.length > 0) {

            const total =
                values.reduce(
                    function (
                        sum,
                        value
                    ) {

                        return (
                            sum + value
                        );

                    },
                    0
                );


            cgpa =
                (
                    total /
                    values.length
                ).toFixed(2);

        }

    }


    /* ARREARS */

    let arrears = 0;


    if (
        Array.isArray(
            profile.arrears
        )
    ) {

        arrears =
            profile.arrears.filter(
                function (arrear) {

                    return (
                        !arrear.status ||
                        arrear.status
                            .toLowerCase() !==
                            "cleared"
                    );

                }
            ).length;

    }



    /* DISPLAY */

    setDashboardText(
        "studentWelcome",
        "Welcome, " + name
    );


    setDashboardText(
        "studentName",
        name
    );


    setDashboardText(
        "studentRegisterNumber",
        registerNumber
    );


    setDashboardText(
        "studentDepartment",
        department
    );


    setDashboardText(
        "studentSection",
        section
    );


    setDashboardText(
        "studentCategory",
        category
    );


    setDashboardText(
        "studentType",
        studentType
    );


    setDashboardText(
        "studentCgpa",
        cgpa
    );


    setDashboardText(
        "studentArrears",
        arrears
    );


    setDashboardText(
        "studentCareerGoal",
        careerGoal
    );


    setDashboardText(
        "careerGoalDisplay",
        careerGoal
    );


    /* PROFILE COMPLETION */

    const completion =
        calculateProfileCompletion(
            profile
        );


    setDashboardText(
        "profileCompletion",
        completion + "%"
    );


    const progress =
        document.getElementById(
            "profileProgress"
        );


    if (progress) {

        progress.style.width =
            completion + "%";

    }

}



/* =========================================================
   GET STUDENT PROFILE
========================================================= */

function getStudentProfile() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "studentProfile"
            )
        );

    }
    catch (error) {

        return null;

    }

}



/* =========================================================
   SET DASHBOARD TEXT
========================================================= */

function setDashboardText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return;
    }


    if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    ) {

        element.textContent =
            value;

    }
    else {

        element.textContent =
            "-";

    }

}



/* =========================================================
   PROFILE COMPLETION
========================================================= */

function calculateProfileCompletion(
    profile
) {

    if (!profile) {
        return 0;
    }


    const fields = [

        "registerNumber",

        "studentName",

        "dob",

        "gender",

        "department",

        "section",

        "institutionalEmail",

        "mobile",

        "category",

        "address",

        "studentType",

        "careerGoal"

    ];


    let completed = 0;


    fields.forEach(
        function (field) {

            const value =
                profile[field];


            if (
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
            ) {

                completed++;

            }

        }
    );


    return Math.round(
        (
            completed /
            fields.length
        ) * 100
    );

}



/* =========================================================
   FACULTY STUDENT LIST
========================================================= */

function initializeStudentsPage() {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    if (!tableBody) {
        return;
    }


    renderStudentTable();


    const search =
        document.getElementById(
            "searchInput"
        );


    const filters = [

        "departmentFilter",

        "sectionFilter",

        "categoryFilter",

        "careerFilter",

        "cgpaFilter",

        "arrearFilter"

    ];


    if (search) {

        search.addEventListener(
            "input",
            renderStudentTable
        );

    }


    filters.forEach(
        function (id) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.addEventListener(
                    "change",
                    renderStudentTable
                );

            }

        }
    );


    const clearButton =
        document.getElementById(
            "clearFilters"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                if (search) {
                    search.value = "";
                }


                filters.forEach(
                    function (id) {

                        const element =
                            document.getElementById(
                                id
                            );


                        if (element) {

                            element.value =
                                "All";

                        }

                    }
                );


                renderStudentTable();

            }
        );

    }

}



/* =========================================================
   GET ALL STUDENTS
========================================================= */

function getAllStudents() {

    let students = [];


    try {

        students =
            JSON.parse(
                localStorage.getItem(
                    "students"
                )
            ) || [];

    }
    catch (error) {

        students = [];

    }


    /* ADD PROFILE IF LIST EMPTY */

    const profile =
        getStudentProfile();


    if (
        profile &&
        profile.registerNumber
    ) {

        const exists =
            students.some(
                function (student) {

                    return (
                        student.registerNumber ===
                        profile.registerNumber
                    );

                }
            );


        if (!exists) {

            students.push(
                profile
            );

        }

    }


    return students;

}



/* =========================================================
   RENDER STUDENT TABLE
========================================================= */

function renderStudentTable() {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    if (!tableBody) {
        return;
    }


    const students =
        getFilteredStudents();


    tableBody.innerHTML = "";


    if (
        students.length === 0
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `

            <td colspan="10"
                class="empty-table">

                No student records found.

            </td>

        `;


        tableBody.appendChild(
            row
        );


        return;
    }


    students.forEach(
        function (
            student,
            index
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            const cgpa =
                getStudentCgpa(
                    student
                );


            const arrears =
                getStudentArrears(
                    student
                );


            const careerGoal =
                student.careerGoal ||
                "-";


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${escapeHtml(
                        student.registerNumber ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHtml(
                        student.studentName ||
                        student.name ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHtml(
                        student.department ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHtml(
                        student.section ||
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHtml(
                        student.category ||
                        student.studentCategory ||
                        "-"
                    )}
                </td>

                <td>
                    ${cgpa}
                </td>

                <td>
                    ${arrears}
                </td>

                <td>
                    ${escapeHtml(
                        careerGoal
                    )}
                </td>

                <td>

                    <button
                        type="button"
                        class="table-view-button"
                        onclick="viewStudent(
                            '${encodeURIComponent(
                                student.registerNumber || ""
                            )}'
                        )"
                    >
                        View
                    </button>

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );

}



/* =========================================================
   FILTER STUDENTS
========================================================= */

function getFilteredStudents() {

    let students =
        getAllStudents();


    const search =
        getElementValue(
            "searchInput"
        ).toLowerCase();


    const department =
        getElementValue(
            "departmentFilter"
        );


    const section =
        getElementValue(
            "sectionFilter"
        );


    const category =
        getElementValue(
            "categoryFilter"
        );


    const career =
        getElementValue(
            "careerFilter"
        );


    const cgpaFilter =
        getElementValue(
            "cgpaFilter"
        );


    const arrearFilter =
        getElementValue(
            "arrearFilter"
        );


    students =
        students.filter(
            function (student) {

                const name =
                    (
                        student.studentName ||
                        student.name ||
                        ""
                    ).toLowerCase();


                const registerNumber =
                    (
                        student.registerNumber ||
                        ""
                    ).toLowerCase();


                const studentDepartment =
                    student.department ||
                    "";


                const studentSection =
                    student.section ||
                    "";


                const studentCategory =
                    student.category ||
                    student.studentCategory ||
                    "";


                const studentCareer =
                    student.careerGoal ||
                    "";


                const studentCgpa =
                    getStudentCgpa(
                        student
                    );


                const studentArrears =
                    getStudentArrears(
                        student
                    );


                if (
                    search &&
                    !name.includes(search) &&
                    !registerNumber.includes(search)
                ) {

                    return false;

                }


                if (
                    department &&
                    department !== "All" &&
                    studentDepartment !== department
                ) {

                    return false;

                }


                if (
                    section &&
                    section !== "All" &&
                    studentSection !== section
                ) {

                    return false;

                }


                if (
                    category &&
                    category !== "All" &&
                    studentCategory !== category
                ) {

                    return false;

                }


                if (
                    career &&
                    career !== "All" &&
                    studentCareer !== career
                ) {

                    return false;

                }


                if (
                    cgpaFilter &&
                    cgpaFilter !== "All"
                ) {

                    const cgpa =
                        parseFloat(
                            studentCgpa
                        );


                    if (
                        cgpaFilter === "Below 6" &&
                        !(cgpa < 6)
                    ) {

                        return false;

                    }


                    if (
                        cgpaFilter === "6 - 7" &&
                        !(cgpa >= 6 && cgpa < 7)
                    ) {

                        return false;

                    }


                    if (
                        cgpaFilter === "7 - 8" &&
                        !(cgpa >= 7 && cgpa < 8)
                    ) {

                        return false;

                    }


                    if (
                        cgpaFilter === "8 - 9" &&
                        !(cgpa >= 8 && cgpa < 9)
                    ) {

                        return false;

                    }


                    if (
                        cgpaFilter === "9 - 10" &&
                        !(cgpa >= 9 && cgpa <= 10)
                    ) {

                        return false;

                    }

                }


                if (
                    arrearFilter &&
                    arrearFilter !== "All"
                ) {

                    if (
                        arrearFilter === "With Arrears" &&
                        studentArrears <= 0
                    ) {

                        return false;

                    }


                    if (
                        arrearFilter === "No Arrears" &&
                        studentArrears > 0
                    ) {

                        return false;

                    }

                }


                return true;

            }
        );


    return students;

}



/* =========================================================
   STUDENT CGPA
========================================================= */

function getStudentCgpa(
    student
) {

    if (
        student.cgpa !== undefined &&
        student.cgpa !== ""
    ) {

        return Number(
            student.cgpa
        ).toFixed(2);

    }


    if (
        Array.isArray(
            student.semesters
        )
    ) {

        const values =
            student.semesters
                .map(
                    function (semester) {

                        return parseFloat(
                            semester.cgpa
                        );

                    }
                )
                .filter(
                    function (value) {

                        return !isNaN(
                            value
                        );

                    }
                );


        if (values.length > 0) {

            const total =
                values.reduce(
                    function (
                        sum,
                        value
                    ) {

                        return (
                            sum + value
                        );

                    },
                    0
                );


            return (
                total /
                values.length
            ).toFixed(2);

        }

    }


    return "-";

}



/* =========================================================
   STUDENT ARREARS
========================================================= */

function getStudentArrears(
    student
) {

    if (
        Array.isArray(
            student.arrears
        )
    ) {

        return student.arrears.filter(
            function (arrear) {

                return (
                    !arrear.status ||
                    arrear.status
                        .toLowerCase() !==
                        "cleared"
                );

            }
        ).length;

    }


    if (
        student.totalArrears !== undefined
    ) {

        return Number(
            student.totalArrears
        ) || 0;

    }


    return 0;

}



/* =========================================================
   VIEW STUDENT
========================================================= */

function viewStudent(
    registerNumber
) {

    const decoded =
        decodeURIComponent(
            registerNumber
        );


    localStorage.setItem(
        "selectedStudent",
        decoded
    );


    window.location.href =
        "student-view.html";

}



/* =========================================================
   STUDENT VIEW PAGE
========================================================= */

function initializeStudentView() {

    const name =
        document.getElementById(
            "viewStudentName"
        );


    if (!name) {
        return;
    }


    const selected =
        localStorage.getItem(
            "selectedStudent"
        );


    const students =
        getAllStudents();


    const student =
        students.find(
            function (item) {

                return (
                    item.registerNumber ===
                    selected
                );

            }
        );


    if (!student) {
        return;
    }


    const values = {

        viewStudentName:
            student.studentName ||
            "-",

        viewRegisterNumber:
            student.registerNumber ||
            "-",

        viewDepartment:
            student.department ||
            "-",

        viewSection:
            student.section ||
            "-",

        viewCategory:
            student.category ||
            student.studentCategory ||
            "-",

        viewCgpa:
            getStudentCgpa(
                student
            ),

        viewArrears:
            getStudentArrears(
                student
            ),

        viewCareerGoal:
            student.careerGoal ||
            "-",

        viewEmail:
            student.institutionalEmail ||
            "-",

        viewMobile:
            student.mobile ||
            "-"

    };


    Object.keys(values).forEach(
        function (id) {

            setDashboardText(
                id,
                values[id]
            );

        }
    );

}



/* =========================================================
   FACULTY DASHBOARD
========================================================= */

function initializeFacultyDashboard() {

    const total =
        document.getElementById(
            "totalStudents"
        );


    if (!total) {
        return;
    }


    updateFacultyDashboard();

}



/* =========================================================
   UPDATE FACULTY DASHBOARD
========================================================= */

function updateFacultyDashboard() {

    const students =
        getAllStudents();


    const totalStudents =
        students.length;


    let hostellers = 0;

    let dayScholars = 0;

    let totalCgpa = 0;

    let cgpaCount = 0;

    let highestCgpa = 0;

    let lowestCgpa = 10;

    let activeArrears = 0;

    let totalArrears = 0;

    let clearedArrears = 0;

    let placement = 0;

    let higherStudies = 0;

    let entrepreneurship = 0;

    let remedial = 0;

    let withoutProjects = 0;



    students.forEach(
        function (student) {


            /* STUDENT TYPE */

            const type =
                (
                    student.studentType ||
                    ""
                ).toLowerCase();


            if (
                type === "hosteller"
            ) {

                hostellers++;

            }
            else if (
                type === "day scholar"
            ) {

                dayScholars++;

            }



            /* CGPA */

            const cgpa =
                parseFloat(
                    getStudentCgpa(
                        student
                    )
                );


            if (!isNaN(cgpa)) {

                totalCgpa += cgpa;

                cgpaCount++;


                if (
                    cgpa > highestCgpa
                ) {

                    highestCgpa =
                        cgpa;

                }


                if (
                    cgpa < lowestCgpa
                ) {

                    lowestCgpa =
                        cgpa;

                }


                if (
                    cgpa < 6
                ) {

                    remedial++;

                }

            }



            /* ARREARS */

            if (
                Array.isArray(
                    student.arrears
                )
            ) {

                student.arrears.forEach(
                    function (arrear) {

                        totalArrears++;


                        if (
                            arrear.status &&
                            arrear.status
                                .toLowerCase() ===
                                "cleared"
                        ) {

                            clearedArrears++;

                        }
                        else {

                            activeArrears++;

                        }

                    }
                );

            }
            else {

                activeArrears +=
                    getStudentArrears(
                        student
                    );

            }



            /* CAREER GOAL */

            const career =
                (
                    student.careerGoal ||
                    ""
                ).toLowerCase();


            if (
                career ===
                "placement"
            ) {

                placement++;

            }


            if (
                career ===
                "higher studies"
            ) {

                higherStudies++;

            }


            if (
                career ===
                "entrepreneurship"
            ) {

                entrepreneurship++;

            }



            /* PROJECT */

            if (
                !student.project &&
                !student.projects &&
                !student.projectTitle
            ) {

                withoutProjects++;

            }

        }
    );


    const averageCgpa =
        cgpaCount > 0
            ? (
                totalCgpa /
                cgpaCount
            ).toFixed(2)
            : "-";


    if (
        lowestCgpa === 10 &&
        cgpaCount === 0
    ) {

        lowestCgpa = "-";

    }


    /* DISPLAY */

    setDashboardText(
        "totalStudents",
        totalStudents
    );


    setDashboardText(
        "hostellerCount",
        hostellers
    );


    setDashboardText(
        "dayScholarCount",
        dayScholars
    );


    setDashboardText(
        "averageCgpa",
        averageCgpa
    );


    setDashboardText(
        "highestCgpa",
        cgpaCount > 0
            ? highestCgpa.toFixed(2)
            : "-"
    );


    setDashboardText(
        "lowestCgpa",
        cgpaCount > 0
            ? lowestCgpa.toFixed(2)
            : "-"
    );


    setDashboardText(
        "activeArrears",
        activeArrears
    );


    setDashboardText(
        "totalArrears",
        totalArrears
    );


    setDashboardText(
        "pendingArrears",
        activeArrears
    );


    setDashboardText(
        "clearedArrears",
        clearedArrears
    );


    setDashboardText(
        "placementCount",
        placement
    );


    setDashboardText(
        "higherStudiesCount",
        higherStudies
    );


    setDashboardText(
        "entrepreneurshipCount",
        entrepreneurship
    );


    setDashboardText(
        "remedialStudents",
        remedial
    );


    setDashboardText(
        "withoutProjects",
        withoutProjects
    );


    setDashboardText(
        "mentorIntervention",
        activeArrears +
        remedial
    );

}



/* =========================================================
   ADD STUDENT PAGE
========================================================= */

function initializeAddStudent() {

    const form =
        document.getElementById(
            "addStudentForm"
        );


    if (!form) {
        return;
    }


    form.noValidate = true;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const formData =
                new FormData(form);


            const student = {};


            formData.forEach(
                function (value, key) {

                    student[key] =
                        value;

                }
            );


            saveStudentToList(
                student
            );


            alert(
                "Student added successfully."
            );


            form.reset();

        }
    );

}



/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const logoutLinks =
        document.querySelectorAll(
            "#logoutLink, .logout-link"
        );


    logoutLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    localStorage.removeItem(
                        "userRole"
                    );


                    localStorage.removeItem(
                        "loggedInUser"
                    );


                    window.location.href =
                        "index.html";

                }
            );

        }
    );

}



/* =========================================================
   HELPER - GET ELEMENT VALUE
========================================================= */

function getElementValue(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return "";
    }


    return (
        element.value || ""
    ).trim();

}



/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(
    value
) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}



/* =========================================================
   END OF APP.JS
========================================================= */