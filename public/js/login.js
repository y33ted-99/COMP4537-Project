import { Auth } from "./auth/authClass.js";

const auth = new Auth("http://localhost:5500");

const email = document.getElementById("email");
const password = document.getElementById("password");

const submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  const response = await auth.loginUser(email.value, password.value);

  if (response === true) {    
    window.location.href = "/user";
    return;
  }

  const errorText = document.getElementById("error_message");
  errorText.textContent = "Invalid Email or Password";
  errorText.style.display = "block";
});
