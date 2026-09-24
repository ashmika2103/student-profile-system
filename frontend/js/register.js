// ============================================================
// STUDENT REGISTRATION
// ============================================================

const REGISTER_API_URL = "/api";


// ============================================================
// GET ELEMENTS
// ============================================================

const registerForm = document.getElementById("registerForm");

const registerNumber = document.getElementById("registerNumber");

const studentName = document.getElementById("studentName");

const collegeEmail = document.getElementById("collegeEmail");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const registerMessage = document.getElementById("registerMessage");


// ============================================================
// SHOW MESSAGE
// ============================================================

function showRegisterMessage(message, type) {

    if (!registerMessage) {
        return;
    }

    registerMessage.textContent = message;

    if (type === "success") {
        registerMessage.style.color = "green";
    } else {
        registerMessage.style.color = "red";
    }
}


// ============================================================
// PASSWORD SHOW / HIDE
// ============================================================

function addPasswordToggle(input) {

    if (!input) {
        return;
    }

    const parent = input.parentElement;

    if (!parent) {
        return;
    }

    // Make the input container relative
    parent.style.position = "relative";

    const toggleButton = document.createElement("button");

    toggleButton.type = "button";

    toggleButton.textContent = "Show";

    toggleButton.style.position = "absolute";
    toggleButton.style.right = "10px";
    toggleButton.style.top = "50%";
    toggleButton.style.transform = "translateY(-50%)";

    toggleButton.style.background = "transparent";
    toggleButton.style.border = "none";
    toggleButton.style.padding = "4px 8px";

    toggleButton.style.cursor = "pointer";

    toggleButton.style.fontFamily =
        '"Times New Roman", serif';

    toggleButton.style.fontSize = "14px";

    toggleButton.style.color = "#1d4ed8";

    // Prevent button from submitting the form
    toggleButton.addEventListener("click", function () {

        if (input.type === "password") {

            input.type = "text";

            toggleButton.textContent = "Hide";

        } else {

            input.type = "password";

            toggleButton.textContent = "Show";
        }

    });

    parent.appendChild(toggleButton);
}


// Add separate buttons to BOTH fields
addPasswordToggle(password);

addPasswordToggle(confirmPassword);


// ============================================================
// REGISTRATION
// ============================================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            showRegisterMessage("", "error");


            // ------------------------------------------------
            // GET VALUES
            // ------------------------------------------------

            const registerNumberValue =
                registerNumber.value.trim();

            const studentNameValue =
                studentName.value.trim();

            const collegeEmailValue =
                collegeEmail.value.trim();

            const passwordValue =
                password.value;

            const confirmPasswordValue =
                confirmPassword.value;


            // ------------------------------------------------
            // CHECK EMPTY FIELDS
            // ------------------------------------------------

            if (
                !registerNumberValue ||
                !studentNameValue ||
                !collegeEmailValue ||
                !passwordValue ||
                !confirmPasswordValue
            ) {

                showRegisterMessage(
                    "Please fill all fields.",
                    "error"
                );

                return;
            }


            // ------------------------------------------------
            // REGISTER NUMBER VALIDATION
            // ------------------------------------------------

            const registerPattern =
                /^[A-Za-z0-9]+$/;

            if (
                !registerPattern.test(
                    registerNumberValue
                )
            ) {

                showRegisterMessage(
                    "Enter a valid Register Number.",
                    "error"
                );

                return;
            }


            // ------------------------------------------------
            // NAME VALIDATION
            // ------------------------------------------------

            const namePattern =
                /^[A-Za-z ]+$/;

            if (
                !namePattern.test(
                    studentNameValue
                )
            ) {

                showRegisterMessage(
                    "Student name should contain only letters.",
                    "error"
                );

                return;
            }


            // ------------------------------------------------
            // EMAIL VALIDATION
            // ------------------------------------------------

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailPattern.test(
                    collegeEmailValue
                )
            ) {

                showRegisterMessage(
                    "Enter a valid college email.",
                    "error"
                );

                return;
            }


            // ------------------------------------------------
            // PASSWORD LENGTH
            // ------------------------------------------------

            if (passwordValue.length < 6) {

                showRegisterMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            // ------------------------------------------------
            // PASSWORD MATCH
            // ------------------------------------------------

            if (
                passwordValue !==
                confirmPasswordValue
            ) {

                showRegisterMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            // ------------------------------------------------
            // SUBMIT BUTTON
            // ------------------------------------------------

            const submitButton =
                registerForm.querySelector(
                    "button[type='submit']"
                );

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Creating Account...";
            }


            // ------------------------------------------------
            // SEND REGISTRATION REQUEST
            // ------------------------------------------------

            try {

                const response =
                    await fetch(
                        `${REGISTER_API_URL}/auth/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                loginId:
                                    registerNumberValue,

                                password:
                                    passwordValue,

                                role:
                                    "Student",

                                registerNumber:
                                    registerNumberValue,

                                name:
                                    studentNameValue
                            })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Registration response:",
                    data
                );


                // ------------------------------------------------
                // CHECK RESPONSE
                // ------------------------------------------------

                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Registration failed."
                    );
                }


                // ------------------------------------------------
                // SUCCESS
                // ------------------------------------------------

                showRegisterMessage(
                    "Registration successful! You can now login.",
                    "success"
                );


                // Clear password fields

                password.value = "";

                confirmPassword.value = "";


                // Go to login page

                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    1500
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                showRegisterMessage(
                    error.message ||
                    "Registration failed.",
                    "error"
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Create Account";
                }
            }
        }
    );
}