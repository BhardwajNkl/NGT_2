document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const signupButton = document.getElementById("signup");
  
    signupButton.addEventListener("click", async () => {
      const username = usernameInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      let isValid = true;

      if (!confirmPassword || password !== confirmPassword) {
        isValid = false;
      }
  
      if (isValid) {
        try {
          const response = await fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          if (response.ok) {
            window.location.href = "http://localhost:3000/success";
          } else {
            console.error("Signup error:", response.statusText);
          }
        } catch (error) {
          console.error("Signup error:", error);
        }
      }
    });
  });
  