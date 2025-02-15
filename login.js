document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginform"); // Updated to match HTML form ID
  if (!loginForm) {
    console.error("Error: loginform element not found");
    return;
  }

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://localhost:7261/api/UserLogin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", result.token); // Store token if returned
        window.location.href = "/Rooms.html"; // Redirect to rooms page
      } else {
        alert("Login failed: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
});
