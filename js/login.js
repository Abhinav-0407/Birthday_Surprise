// PROJECT MIDNIGHT GOLD 2.0 — LOGIN
// Original credentials and validation behavior are preserved.
// Successful login now opens question.html (the new surprise-question step).

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

// Show / Hide Password
togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        togglePassword.setAttribute("aria-label", "Hide password");
    } else {
        password.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
        togglePassword.setAttribute("aria-label", "Show password");
    }
});

// Login Validation
loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const pass = password.value.trim();

    // Original username and password — unchanged.
    if (username === "Zebaa" && pass === "211110") {
        message.style.color = "#C86B98";
        message.textContent = "Login Successful!";

        loginBtn.disabled = true;

        setTimeout(() => {
            window.location.href = "question.html";
        }, 1200);
    } else {
        message.style.color = "#C04F70";
        message.textContent = "Invalid Username or Password";
    }
});

// Allow Enter key to submit without changing the existing click behavior.
[document.getElementById("username"), password].forEach((field) => {
    field.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            loginBtn.click();
        }
    });
});
