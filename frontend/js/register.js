const API_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("studentRegisterForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const registerNumber =
            document.getElementById("registerNumber").value.trim();

        const studentName =
            document.getElementById("studentName").value.trim();

        const collegeEmail =
            document.getElementById("collegeEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        // Clear previous message
        message.className = "register-message";
        message.textContent = "";


        // Empty field validation
        if (
            !registerNumber ||
            !studentName ||
            !collegeEmail ||
            !password ||
            !confirmPassword
        ) {
            message.className = "register-message error";
            message.textContent = "Please fill in all fields.";
            return;
        }


        // Password length validation
        if (password.length < 6) {
            message.className = "register-message error";
            message.textContent =
                "Password must contain at least 6 characters.";
            return;
        }


        // Password match validation
        if (password !== confirmPassword) {
            message.className = "register-message error";
            message.textContent =
                "Passwords do not match.";
            return;
        }


        // Email validation
        if (!collegeEmail.includes("@")) {
            message.className = "register-message error";
            message.textContent =
                "Please enter a valid college email.";
            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        loginId: registerNumber,
                        password: password,
                        role: "Student",
                        registerNumber: registerNumber,
                        name: studentName
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                message.className =
                    "register-message error";

                message.textContent =
                    data.message || "Registration failed.";

                return;
            }


            // Registration successful
            message.className =
                "register-message success";

            message.textContent =
                "Registration successful! Redirecting to login...";


            form.reset();


            setTimeout(() => {

                window.location.href = "index.html";

            }, 1500);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            message.className =
                "register-message error";

            message.textContent =
                "Cannot connect to the server. Please make sure the backend is running.";
        }

    });

});