const API_URL = "http://localhost:5000/api";


/* =====================================================
   COMMON FUNCTIONS
===================================================== */

function getLoggedUser() {
    try {
        return JSON.parse(
            localStorage.getItem("loggedUser")
        );
    } catch {
        return null;
    }
}


function logout() {

    localStorage.removeItem("loggedUser");
    localStorage.removeItem("currentStudent");

    window.location.href = "index.html";
}


function showMessage(elementId, message, type = "success") {

    const element =
        document.getElementById(elementId);

    if (!element) return;

    element.innerHTML = `
        <div class="${type === "success"
            ? "success-message"
            : "validation-message"}">
            ${message}
        </div>
    `;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   PAGE ACCESS CONTROL
===================================================== */

function checkStudentPage() {

    const user = getLoggedUser();

    if (!user) {
        window.location.href = "index.html";
        return false;
    }

    if (user.role !== "Student") {
        alert("Student access only.");

        window.location.href =
            "faculty-dashboard.html";

        return false;
    }

    return true;
}


function checkFacultyPage() {

    const user = getLoggedUser();

    if (!user) {
        window.location.href = "index.html";
        return false;
    }

    if (user.role !== "Faculty") {
        alert("Faculty access only.");

        window.location.href =
            "student-dashboard.html";

        return false;
    }

    return true;
}


/* =====================================================
   LOGIN
===================================================== */

function initializeLogin() {

    const form =
        document.getElementById("loginForm");

    if (!form) return;

    const role =
        document.getElementById("role");

    const loginId =
        document.getElementById("loginId");

    const password =
        document.getElementById("password");


    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const selectedRole =
            role.value.trim();

        const enteredLoginId =
            loginId.value.trim();

        const enteredPassword =
            password.value.trim();


        if (
            !selectedRole ||
            !enteredLoginId ||
            !enteredPassword
        ) {

            showMessage(
                "loginError",
                "Please enter all login details.",
                "error"
            );

            return;
        }


        try {

            const response =
                await fetch(
                    `${API_URL}/auth/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            loginId:
                                enteredLoginId,

                            password:
                                enteredPassword,

                            role:
                                selectedRole
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                showMessage(
                    "loginError",
                    data.message ||
                    "Invalid login credentials.",
                    "error"
                );

                return;
            }


            localStorage.setItem(
                "loggedUser",
                JSON.stringify(data.user)
            );


            if (data.user.role === "Student") {

                window.location.href =
                    "student-dashboard.html";

            } else {

                window.location.href =
                    "faculty-dashboard.html";

            }


        } catch (error) {

            console.error(error);

            showMessage(
                "loginError",
                "Cannot connect to backend. Make sure the server is running.",
                "error"
            );
        }

    });
}


/* =====================================================
   STUDENT TYPE
===================================================== */

function initializeStudentType() {

    const studentType =
        document.getElementById("studentType");

    if (!studentType) return;


    function updateFields() {

        const hostelFields =
            document.getElementById("hostelFields");

        const hostelRoomField =
            document.getElementById("hostelRoomField");

        const dayScholarFields =
            document.getElementById("dayScholarFields");


        hostelFields.style.display =
            "none";

        hostelRoomField.style.display =
            "none";

        dayScholarFields.style.display =
            "none";


        if (studentType.value === "Hosteller") {

            hostelFields.style.display =
                "flex";

            hostelRoomField.style.display =
                "flex";

        }


        if (
            studentType.value ===
            "Day Scholar"
        ) {

            dayScholarFields.style.display =
                "flex";
        }
    }


    studentType.addEventListener(
        "change",
        updateFields
    );

    updateFields();
}


/* =====================================================
   CAREER GOAL
===================================================== */

function initializeCareerGoal() {

    const careerGoal =
        document.getElementById("careerGoal");

    if (!careerGoal) return;


    function updateCareerFields() {

        const placement =
            document.getElementById(
                "placementFields"
            );

        const higher =
            document.getElementById(
                "higherStudiesFields"
            );

        const entrepreneurship =
            document.getElementById(
                "entrepreneurshipFields"
            );


        placement.style.display = "none";
        higher.style.display = "none";
        entrepreneurship.style.display = "none";


        if (
            careerGoal.value ===
            "Placement"
        ) {

            placement.style.display =
                "block";
        }


        if (
            careerGoal.value ===
            "Higher Studies"
        ) {

            higher.style.display =
                "block";
        }


        if (
            careerGoal.value ===
            "Entrepreneurship"
        ) {

            entrepreneurship.style.display =
                "block";
        }
    }


    careerGoal.addEventListener(
        "change",
        updateCareerFields
    );

    updateCareerFields();
}


/* =====================================================
   SEMESTER
===================================================== */

let semesterCount = 0;


function addSemester() {

    semesterCount++;

    const container =
        document.getElementById(
            "semesterContainer"
        );

    if (!container) return;


    const div =
        document.createElement("div");

    div.className = "card";

    div.style.marginTop = "15px";


    div.innerHTML = `

        <h3>
            Semester ${semesterCount}
        </h3>

        <div class="form-grid">

            <div class="form-group">

                <label>Semester</label>

                <input
                    type="number"
                    class="semester-number"
                    value="${semesterCount}"
                    min="1"
                    max="8">

            </div>


            <div class="form-group">

                <label>Percentage</label>

                <input
                    type="number"
                    class="semester-percentage"
                    min="0"
                    max="100"
                    step="0.01">

            </div>


            <div class="form-group">

                <label>Total Arrears</label>

                <input
                    type="number"
                    class="semester-total-arrears"
                    min="0"
                    value="0">

            </div>


            <div class="form-group">

                <label>Cleared Arrears</label>

                <input
                    type="number"
                    class="semester-cleared-arrears"
                    min="0"
                    value="0">

            </div>

        </div>

        <div class="button-container">

            <button
                type="button"
                class="btn btn-danger"
                onclick="this.closest('.card').remove()">

                Remove Semester

            </button>

        </div>
    `;


    container.appendChild(div);
}


/* =====================================================
   ARREARS
===================================================== */

let arrearCount = 0;


function initializeArrears() {

    const hasArrears =
        document.getElementById(
            "hasArrears"
        );

    if (!hasArrears) return;


    hasArrears.addEventListener(
        "change",
        function () {

            const section =
                document.getElementById(
                    "arrearSection"
                );

            if (
                hasArrears.value ===
                "true"
            ) {

                section.style.display =
                    "block";

            } else {

                section.style.display =
                    "none";
            }
        }
    );
}


function addArrear() {

    arrearCount++;

    const container =
        document.getElementById(
            "arrearContainer"
        );

    if (!container) return;


    const div =
        document.createElement("div");

    div.className = "card";

    div.style.marginTop = "15px";


    div.innerHTML = `

        <h3>
            Arrear ${arrearCount}
        </h3>

        <div class="form-grid">

            <div class="form-group">

                <label>Subject Code</label>

                <input
                    type="text"
                    class="arrear-code">

            </div>


            <div class="form-group">

                <label>Subject Name</label>

                <input
                    type="text"
                    class="arrear-name">

            </div>


            <div class="form-group">

                <label>Semester</label>

                <input
                    type="number"
                    class="arrear-semester"
                    min="1"
                    max="8">

            </div>


            <div class="form-group">

                <label>Status</label>

                <select class="arrear-status">

                    <option value="Active">
                        Active
                    </option>

                    <option value="Cleared">
                        Cleared
                    </option>

                </select>

            </div>

        </div>

        <div class="button-container">

            <button
                type="button"
                class="btn btn-danger"
                onclick="this.closest('.card').remove()">

                Remove

            </button>

        </div>
    `;


    container.appendChild(div);
}


/* =====================================================
   VALIDATION
===================================================== */

function validateStudentForm() {

    const form =
        document.getElementById(
            "studentForm"
        );

    if (!form) return false;


    let valid = true;


    form.querySelectorAll(
        ".error-message"
    ).forEach(
        element => element.remove()
    );


    form.querySelectorAll(
        ".input-error"
    ).forEach(
        element =>
            element.classList.remove(
                "input-error"
            )
    );


    const requiredFields =
        form.querySelectorAll(
            "[required]"
        );


    requiredFields.forEach(field => {

        if (
            field.offsetParent === null
        ) {
            return;
        }


        if (
            !field.value.trim()
        ) {

            valid = false;

            field.classList.add(
                "input-error"
            );


            const error =
                document.createElement(
                    "span"
                );

            error.className =
                "error-message";

            error.textContent =
                "This field is required.";


            field.parentNode.appendChild(
                error
            );
        }

    });


    const mobile =
        document.getElementById(
            "mobile"
        );


    if (
        mobile &&
        mobile.value &&
        !/^[6-9]\d{9}$/.test(
            mobile.value.trim()
        )
    ) {

        valid = false;

        mobile.classList.add(
            "input-error"
        );
    }


    const collegeEmail =
        document.getElementById(
            "collegeEmail"
        );


    if (
        collegeEmail &&
        collegeEmail.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            collegeEmail.value.trim()
        )
    ) {

        valid = false;

        collegeEmail.classList.add(
            "input-error"
        );
    }


    return valid;
}


/* =====================================================
   COLLECT STUDENT DATA
===================================================== */

function collectStudentData() {

    const getValue =
        id => {

            const element =
                document.getElementById(id);

            return element
                ? element.value.trim()
                : "";
        };


    const semesterRecords = [];


    document
        .querySelectorAll(
            "#semesterContainer .card"
        )
        .forEach(card => {

            const semester =
                card.querySelector(
                    ".semester-number"
                );

            const percentage =
                card.querySelector(
                    ".semester-percentage"
                );

            const totalArrears =
                card.querySelector(
                    ".semester-total-arrears"
                );

            const clearedArrears =
                card.querySelector(
                    ".semester-cleared-arrears"
                );


            if (semester) {

                semesterRecords.push({

                    semester:
                        Number(
                            semester.value
                        ),

                    percentage:
                        Number(
                            percentage.value || 0
                        ),

                    totalArrears:
                        Number(
                            totalArrears.value || 0
                        ),

                    clearedArrears:
                        Number(
                            clearedArrears.value || 0
                        )
                });
            }

        });


    const arrears = [];


    document
        .querySelectorAll(
            "#arrearContainer .card"
        )
        .forEach(card => {

            const code =
                card.querySelector(
                    ".arrear-code"
                );

            const name =
                card.querySelector(
                    ".arrear-name"
                );

            const semester =
                card.querySelector(
                    ".arrear-semester"
                );

            const status =
                card.querySelector(
                    ".arrear-status"
                );


            if (code) {

                arrears.push({

                    subjectCode:
                        code.value.trim(),

                    subjectName:
                        name.value.trim(),

                    semester:
                        Number(
                            semester.value || 0
                        ),

                    status:
                        status.value,

                    attempt: 1

                });
            }

        });


    const hasArrears =
        getValue("hasArrears") === "true";


    return {

        registerNumber:
            getValue("registerNumber"),

        name:
            getValue("name"),

        dob:
            getValue("dob"),

        gender:
            getValue("gender"),

        department:
            getValue("department"),

        section:
            getValue("section"),

        collegeEmail:
            getValue("collegeEmail"),

        personalEmail:
            getValue("personalEmail"),

        mobile:
            getValue("mobile"),

        category:
            getValue("category"),

        address:
            getValue("address"),

        studentType:
            getValue("studentType"),

        hostelName:
            getValue("hostelName"),

        hostelRoom:
            getValue("hostelRoom"),

        distanceFromCollege:
            Number(
                getValue(
                    "distanceFromCollege"
                ) || 0
            ),


        familyDetails: {

            fatherName:
                getValue("fatherName"),

            motherName:
                getValue("motherName"),

            fatherOccupation:
                getValue("fatherOccupation"),

            motherOccupation:
                getValue("motherOccupation"),

            familyIncome:
                Number(
                    getValue(
                        "familyIncome"
                    ) || 0
                )
        },


        semesterRecords,


        hasArrears,

        arrears,


        technicalProfile: {

            programmingLanguages:
                getValue(
                    "programmingLanguages"
                ),

            technicalSkills:
                getValue(
                    "technicalSkills"
                ),

            projects:
                getValue("projects"),

            certifications:
                getValue(
                    "certifications"
                )
        },


        selfEvaluation: {

            strengths:
                getValue("strengths"),

            weaknesses:
                getValue("weaknesses"),

            interests:
                getValue("interests"),

            areasToImprove:
                getValue(
                    "areasToImprove"
                )
        },


        careerGoal:
            getValue("careerGoal"),


        placementDetails: {

            targetCompany:
                getValue(
                    "targetCompany"
                ),

            targetRole:
                getValue(
                    "targetRole"
                ),

            preparationStatus:
                getValue(
                    "preparationStatus"
                )
        },


        higherStudiesDetails: {

            degree:
                getValue(
                    "higherDegree"
                ),

            country:
                getValue(
                    "higherCountry"
                ),

            university:
                getValue(
                    "higherUniversity"
                ),

            entranceExam:
                getValue(
                    "entranceExam"
                )
        },


        entrepreneurshipDetails: {

            businessIdea:
                getValue(
                    "businessIdea"
                ),

            businessDomain:
                getValue(
                    "businessDomain"
                ),

            fundingRequired:
                getValue(
                    "fundingRequired"
                ),

            teamSize:
                Number(
                    getValue(
                        "teamSize"
                    ) || 0
                )
        }

        /*
         * NOTICE:
         * There is NO cgpa here.
         *
         * CGPA belongs to Faculty.
         */
    };
}


/* =====================================================
   STUDENT PROFILE SUBMIT
===================================================== */

function initializeStudentProfile() {

    const form =
        document.getElementById(
            "studentForm"
        );

    if (!form) return;


    if (!checkStudentPage()) {
        return;
    }


    form.noValidate = true;

    form.setAttribute(
        "novalidate",
        "novalidate"
    );


    const user =
        getLoggedUser();


    const registerInput =
        document.getElementById(
            "registerNumber"
        );


    if (
        user &&
        user.registerNumber
    ) {

        registerInput.value =
            user.registerNumber;

        registerInput.readOnly =
            true;
    }


    document
        .getElementById(
            "addSemesterBtn"
        )
        ?.addEventListener(
            "click",
            addSemester
        );


    document
        .getElementById(
            "addArrearBtn"
        )
        ?.addEventListener(
            "click",
            addArrear
        );


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!validateStudentForm()) {

                showMessage(
                    "formMessage",
                    "Please fill all required fields correctly.",
                    "error"
                );

                return;
            }


            const studentData =
                collectStudentData();


            try {

                /*
                 * Check if student already exists.
                 */

                let existingStudent = null;


                const searchResponse =
                    await fetch(
                        `${API_URL}/students/register/${encodeURIComponent(
                            studentData.registerNumber
                        )}`
                    );


                if (
                    searchResponse.ok
                ) {

                    const result =
                        await searchResponse.json();

                    existingStudent =
                        result.student;
                }


                let response;


                if (existingStudent) {

                    /*
                     * UPDATE
                     */

                    response =
                        await fetch(
                            `${API_URL}/students/${existingStudent._id}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        studentData
                                    )
                            }
                        );

                } else {

                    /*
                     * CREATE
                     */

                    response =
                        await fetch(
                            `${API_URL}/students`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        studentData
                                    )
                            }
                        );
                }


                const data =
                    await response.json();


                if (!response.ok) {

                    showMessage(
                        "formMessage",
                        data.message ||
                        "Failed to save profile.",
                        "error"
                    );

                    return;
                }


                localStorage.setItem(
                    "currentStudent",
                    JSON.stringify(
                        data.student
                    )
                );


                showMessage(
                    "formMessage",
                    data.message ||
                    "Profile saved successfully.",
                    "success"
                );


            } catch (error) {

                console.error(error);

                showMessage(
                    "formMessage",
                    "Unable to connect to backend.",
                    "error"
                );
            }

        }
    );


    loadStudentProfile();
}


/* =====================================================
   LOAD STUDENT PROFILE
===================================================== */

async function loadStudentProfile() {

    const user =
        getLoggedUser();

    if (
        !user ||
        !user.registerNumber
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students/register/${encodeURIComponent(
                    user.registerNumber
                )}`
            );


        if (!response.ok) {
            return;
        }


        const data =
            await response.json();


        const student =
            data.student;


        localStorage.setItem(
            "currentStudent",
            JSON.stringify(student)
        );


        fillStudentForm(student);


    } catch (error) {

        console.error(
            "Load profile error:",
            error
        );
    }
}


/* =====================================================
   FILL STUDENT FORM
===================================================== */

function fillStudentForm(student) {

    const setValue =
        (id, value) => {

            const element =
                document.getElementById(id);

            if (element) {

                element.value =
                    value ?? "";
            }
        };


    setValue(
        "registerNumber",
        student.registerNumber
    );

    setValue(
        "name",
        student.name
    );

    setValue(
        "dob",
        student.dob
    );

    setValue(
        "gender",
        student.gender
    );

    setValue(
        "department",
        student.department
    );

    setValue(
        "section",
        student.section
    );

    setValue(
        "collegeEmail",
        student.collegeEmail
    );

    setValue(
        "personalEmail",
        student.personalEmail
    );

    setValue(
        "mobile",
        student.mobile
    );

    setValue(
        "category",
        student.category
    );

    setValue(
        "address",
        student.address
    );

    setValue(
        "studentType",
        student.studentType
    );

    setValue(
        "hostelName",
        student.hostelName
    );

    setValue(
        "hostelRoom",
        student.hostelRoom
    );

    setValue(
        "distanceFromCollege",
        student.distanceFromCollege
    );


    if (student.familyDetails) {

        setValue(
            "fatherName",
            student.familyDetails.fatherName
        );

        setValue(
            "motherName",
            student.familyDetails.motherName
        );

        setValue(
            "fatherOccupation",
            student.familyDetails.fatherOccupation
        );

        setValue(
            "motherOccupation",
            student.familyDetails.motherOccupation
        );

        setValue(
            "familyIncome",
            student.familyDetails.familyIncome
        );
    }


    setValue(
        "hasArrears",
        student.hasArrears
            ? "true"
            : "false"
    );


    if (student.technicalProfile) {

        setValue(
            "programmingLanguages",
            student.technicalProfile.programmingLanguages
        );

        setValue(
            "technicalSkills",
            student.technicalProfile.technicalSkills
        );

        setValue(
            "projects",
            student.technicalProfile.projects
        );

        setValue(
            "certifications",
            student.technicalProfile.certifications
        );
    }


    if (student.selfEvaluation) {

        setValue(
            "strengths",
            student.selfEvaluation.strengths
        );

        setValue(
            "weaknesses",
            student.selfEvaluation.weaknesses
        );

        setValue(
            "interests",
            student.selfEvaluation.interests
        );

        setValue(
            "areasToImprove",
            student.selfEvaluation.areasToImprove
        );
    }


    setValue(
        "careerGoal",
        student.careerGoal
    );


    if (student.placementDetails) {

        setValue(
            "targetCompany",
            student.placementDetails.targetCompany
        );

        setValue(
            "targetRole",
            student.placementDetails.targetRole
        );

        setValue(
            "preparationStatus",
            student.placementDetails.preparationStatus
        );
    }


    if (student.higherStudiesDetails) {

        setValue(
            "higherDegree",
            student.higherStudiesDetails.degree
        );

        setValue(
            "higherCountry",
            student.higherStudiesDetails.country
        );

        setValue(
            "higherUniversity",
            student.higherStudiesDetails.university
        );

        setValue(
            "entranceExam",
            student.higherStudiesDetails.entranceExam
        );
    }


    if (
        student.entrepreneurshipDetails
    ) {

        setValue(
            "businessIdea",
            student.entrepreneurshipDetails.businessIdea
        );

        setValue(
            "businessDomain",
            student.entrepreneurshipDetails.businessDomain
        );

        setValue(
            "fundingRequired",
            student.entrepreneurshipDetails.fundingRequired
        );

        setValue(
            "teamSize",
            student.entrepreneurshipDetails.teamSize
        );
    }
}


/* =====================================================
   FACULTY CGPA UPDATE
===================================================== */

function initializeFacultyForm() {

    const form =
        document.getElementById(
            "facultyStudentForm"
        );

    if (!form) return;


    if (!checkFacultyPage()) {
        return;
    }


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const registerNumber =
                document
                    .getElementById(
                        "facultyRegisterNumber"
                    )
                    .value.trim();


            const name =
                document
                    .getElementById(
                        "facultyStudentName"
                    )
                    .value.trim();


            const cgpa =
                Number(
                    document
                        .getElementById(
                            "facultyCgpa"
                        )
                        .value
                );


            const mentorRemarks =
                document
                    .getElementById(
                        "mentorRemarks"
                    )
                    .value.trim();


            const mentorStatus =
                document
                    .getElementById(
                        "mentorStatus"
                    )
                    .value;


            if (
                !registerNumber ||
                !name
            ) {

                showMessage(
                    "facultyMessage",
                    "Register number and name are required.",
                    "error"
                );

                return;
            }


            if (
                isNaN(cgpa) ||
                cgpa < 0 ||
                cgpa > 10
            ) {

                showMessage(
                    "facultyMessage",
                    "CGPA must be between 0 and 10.",
                    "error"
                );

                return;
            }


            try {

                /*
                 * Find student
                 */

                const searchResponse =
                    await fetch(
                        `${API_URL}/students/register/${encodeURIComponent(
                            registerNumber
                        )}`
                    );


                if (
                    !searchResponse.ok
                ) {

                    showMessage(
                        "facultyMessage",
                        "Student not found. The student must submit their profile first.",
                        "error"
                    );

                    return;
                }


                const searchData =
                    await searchResponse.json();


                const student =
                    searchData.student;


                /*
                 * Update ONLY faculty fields
                 */

                const updateResponse =
                    await fetch(
                        `${API_URL}/students/${student._id}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    cgpa,

                                    mentorRemarks,

                                    mentorStatus

                                })
                        }
                    );


                const data =
                    await updateResponse.json();


                if (!updateResponse.ok) {

                    showMessage(
                        "facultyMessage",
                        data.message ||
                        "Failed to update CGPA.",
                        "error"
                    );

                    return;
                }


                showMessage(
                    "facultyMessage",
                    "CGPA updated successfully.",
                    "success"
                );


                form.reset();


            } catch (error) {

                console.error(error);

                showMessage(
                    "facultyMessage",
                    "Unable to connect to backend.",
                    "error"
                );
            }

        }
    );
}


/* =====================================================
   STUDENTS PAGE
===================================================== */

function initializeStudentsPage() {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );

    if (!tableBody) return;


    if (!checkFacultyPage()) {
        return;
    }


    const search =
        document.getElementById(
            "searchInput"
        );

    const department =
        document.getElementById(
            "departmentFilter"
        );

    const section =
        document.getElementById(
            "sectionFilter"
        );

    const category =
        document.getElementById(
            "categoryFilter"
        );

    const career =
        document.getElementById(
            "careerFilter"
        );

    const arrear =
        document.getElementById(
            "arrearFilter"
        );


    const loadStudents =
        async function () {

            try {

                const params =
                    new URLSearchParams();


                if (search.value) {

                    params.set(
                        "search",
                        search.value
                    );
                }


                if (department.value) {

                    params.set(
                        "department",
                        department.value
                    );
                }


                if (section.value) {

                    params.set(
                        "section",
                        section.value
                    );
                }


                if (category.value) {

                    params.set(
                        "category",
                        category.value
                    );
                }


                if (career.value) {

                    params.set(
                        "careerGoal",
                        career.value
                    );
                }


                if (arrear.value) {

                    params.set(
                        "arrearStatus",
                        arrear.value
                    );
                }


                const response =
                    await fetch(
                        `${API_URL}/students?${params.toString()}`
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message
                    );
                }


                tableBody.innerHTML = "";


                if (
                    data.students.length === 0
                ) {

                    tableBody.innerHTML = `

                        <tr>

                            <td
                                colspan="9"
                                style="text-align:center;">

                                No students found.

                            </td>

                        </tr>

                    `;

                    return;
                }


                data.students.forEach(
                    (student, index) => {

                        const row =
                            document.createElement(
                                "tr"
                            );


                        row.innerHTML = `

                            <td>
                                ${index + 1}
                            </td>

                            <td>
                                ${student.registerNumber || "-"}
                            </td>

                            <td>
                                ${student.name || "-"}
                            </td>

                            <td>
                                ${student.department || "-"}
                            </td>

                            <td>
                                ${student.section || "-"}
                            </td>

                            <td>
                                ${
                                    student.cgpa
                                    ? Number(student.cgpa).toFixed(2)
                                    : "-"
                                }
                            </td>

                            <td>
                                ${student.careerGoal || "-"}
                            </td>

                            <td>

                                ${
                                    student.hasArrears
                                    ? '<span class="badge badge-red">Yes</span>'
                                    : '<span class="badge badge-green">No</span>'
                                }

                            </td>

                            <td>

                                <a
                                    href="student-view.html?id=${student._id}"
                                    class="btn btn-primary">

                                    View

                                </a>

                            </td>

                        `;


                        tableBody.appendChild(row);

                    }
                );


            } catch (error) {

                console.error(error);

                tableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="9"
                            style="text-align:center;">

                            Failed to load students.

                        </td>

                    </tr>

                `;
            }
        };


    [
        search,
        department,
        section,
        category,
        career,
        arrear
    ].forEach(element => {

        if (element) {

            element.addEventListener(
                "input",
                loadStudents
            );

            element.addEventListener(
                "change",
                loadStudents
            );
        }

    });


    loadStudents();
}


/* =====================================================
   FACULTY DASHBOARD
===================================================== */

async function initializeFacultyDashboard() {

    const total =
        document.getElementById(
            "totalStudents"
        );

    if (!total) return;


    if (!checkFacultyPage()) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students`
            );


        const data =
            await response.json();


        if (!response.ok) {
            throw new Error(
                data.message
            );
        }


        const students =
            data.students;


        total.textContent =
            students.length;


        let hostellers = 0;

        let dayScholars = 0;

        let cgpas = [];

        let arrears = 0;

        let placement = 0;

        let higherStudies = 0;

        let entrepreneurship = 0;


        students.forEach(student => {

            if (
                student.studentType ===
                "Hosteller"
            ) {

                hostellers++;
            }


            if (
                student.studentType ===
                "Day Scholar"
            ) {

                dayScholars++;
            }


            if (
                Number(student.cgpa) > 0
            ) {

                cgpas.push(
                    Number(student.cgpa)
                );
            }


            if (
                student.hasArrears
            ) {

                arrears++;
            }


            if (
                student.careerGoal ===
                "Placement"
            ) {

                placement++;
            }


            if (
                student.careerGoal ===
                "Higher Studies"
            ) {

                higherStudies++;
            }


            if (
                student.careerGoal ===
                "Entrepreneurship"
            ) {

                entrepreneurship++;
            }

        });


        const average =
            cgpas.length
                ? cgpas.reduce(
                    (a, b) => a + b,
                    0
                ) / cgpas.length
                : 0;


        const highest =
            cgpas.length
                ? Math.max(...cgpas)
                : 0;


        const lowest =
            cgpas.length
                ? Math.min(...cgpas)
                : 0;


        document.getElementById(
            "hostellerCount"
        ).textContent =
            hostellers;


        document.getElementById(
            "dayScholarCount"
        ).textContent =
            dayScholars;


        document.getElementById(
            "averageCgpa"
        ).textContent =
            average.toFixed(2);


        document.getElementById(
            "highestCgpa"
        ).textContent =
            highest.toFixed(2);


        document.getElementById(
            "lowestCgpa"
        ).textContent =
            lowest.toFixed(2);


        document.getElementById(
            "activeArrears"
        ).textContent =
            arrears;


        document.getElementById(
            "placementCount"
        ).textContent =
            placement;


        document.getElementById(
            "higherStudiesCount"
        ).textContent =
            higherStudies;


        document.getElementById(
            "entrepreneurshipCount"
        ).textContent =
            entrepreneurship;


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );
    }
}


/* =====================================================
   STUDENT DASHBOARD
===================================================== */

async function initializeStudentDashboard() {

    const dashboard =
        document.getElementById(
            "studentDashboard"
        );

    if (!dashboard) return;


    if (!checkStudentPage()) {
        return;
    }


    const user =
        getLoggedUser();


    if (!user ||
        !user.registerNumber) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students/register/${encodeURIComponent(
                    user.registerNumber
                )}`
            );


        if (!response.ok) {
            return;
        }


        const data =
            await response.json();


        const student =
            data.student;


        document.getElementById(
            "studentName"
        ).textContent =
            student.name || "-";


        document.getElementById(
            "studentRegisterNumber"
        ).textContent =
            student.registerNumber || "-";


        document.getElementById(
            "studentCgpa"
        ).textContent =
            student.cgpa
                ? Number(
                    student.cgpa
                ).toFixed(2)
                : "Not entered";


        document.getElementById(
            "studentCareerGoal"
        ).textContent =
            student.careerGoal || "-";


    } catch (error) {

        console.error(error);
    }
}


/* =====================================================
   STUDENT VIEW
===================================================== */

async function initializeStudentView() {

    const view =
        document.getElementById(
            "studentView"
        );

    if (!view) return;


    if (!checkFacultyPage()) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    if (!id) {

        view.innerHTML =
            "Student ID not found.";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students/${id}`
            );


        const data =
            await response.json();


        if (!response.ok) {

            view.innerHTML =
                data.message;

            return;
        }


        const student =
            data.student;


        view.innerHTML = `

            <div class="card">

                <h2>Personal Details</h2>

                <div class="form-grid">

                    <div class="form-group">

                        <label>Register Number</label>

                        <input
                            value="${student.registerNumber || ""}"
                            readonly>

                    </div>


                    <div class="form-group">

                        <label>Name</label>

                        <input
                            value="${student.name || ""}"
                            readonly>

                    </div>


                    <div class="form-group">

                        <label>Department</label>

                        <input
                            value="${student.department || ""}"
                            readonly>

                    </div>


                    <div class="form-group">

                        <label>Section</label>

                        <input
                            value="${student.section || ""}"
                            readonly>

                    </div>


                    <div class="form-group">

                        <label>Student Type</label>

                        <input
                            value="${student.studentType || ""}"
                            readonly>

                    </div>

                </div>

            </div>


            <div class="card">

                <h2>Academic Details</h2>

                <div class="dashboard-grid">

                    <div class="stat-card">

                        <h3>CGPA</h3>

                        <p>

                            ${
                                student.cgpa
                                ? Number(student.cgpa).toFixed(2)
                                : "Not entered"
                            }

                        </p>

                    </div>


                    <div class="stat-card">

                        <h3>Arrears</h3>

                        <p>

                            ${
                                student.hasArrears
                                ? "Yes"
                                : "No"
                            }

                        </p>

                    </div>


                    <div class="stat-card">

                        <h3>Career Goal</h3>

                        <p style="font-size:20px;">

                            ${
                                student.careerGoal || "-"
                            }

                        </p>

                    </div>

                </div>

            </div>


            <div class="card">

                <h2>Mentor Information</h2>

                <div class="form-grid">

                    <div class="form-group">

                        <label>Mentor Status</label>

                        <input
                            value="${student.mentorStatus || ""}"
                            readonly>

                    </div>


                    <div class="form-group full">

                        <label>Mentor Remarks</label>

                        <textarea readonly>${student.mentorRemarks || ""}</textarea>

                    </div>

                </div>

            </div>

        `;


    } catch (error) {

        console.error(error);

        view.innerHTML =
            "Failed to load student.";
    }
}


/* =====================================================
   PAGE INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeLogin();

        initializeStudentType();

        initializeCareerGoal();

        initializeArrears();

        initializeStudentProfile();

        initializeFacultyForm();

        initializeStudentsPage();

        initializeFacultyDashboard();

        initializeStudentDashboard();

        initializeStudentView();

    }
);