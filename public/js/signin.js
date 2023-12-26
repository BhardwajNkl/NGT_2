document.addEventListener("DOMContentLoaded", () => {
    console.log('hello')
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("signin");
    const loginError = document.getElementById("loginError"); 
  
    loginButton.addEventListener("click", async () => {
      const username = usernameInput.value;
    //   console.log(username)
      const password = passwordInput.value;
  
   
      console.log('user',username, password)
      if (username && password) {
        try {
          const response = await fetch("http://localhost:3000/api/user/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            
          });
          console.log(response)
          if (response.ok) {
            const responseData = await response.json();
            
            window.location.href = "http://localhost:3000/home";
           } else if (response.status === 404 || response.status === 401) {
            loginError.textContent = "Wrong username or password.";
            loginError.style.color = "red";
            loginError.style.display = "block";
          } else{
            console.error("Login error:", error);
          }
        
        } catch (error) {
          console.error("Login error:", error);
        }
      }
    });
  });
  