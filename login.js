document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const responseMessage = document.getElementById("responseMessage");

  if (!loginForm) {
    console.error("Error: loginForm element not found");
    return;
  }

  if (!responseMessage) {
    console.error("Error: responseMessage element not found");
    return;
  }

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();

    if (!email || !password) {
      responseMessage.textContent = "Please enter both email and password.";
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch("https://localhost:7261/api/UserLog/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const responseText = await response.text();
      console.log("Raw Response Text:", responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error("Error parsing response as JSON:", e);
        alert("Unexpected response from the server. Please try again.");
        return;
      }

      console.log("Parsed Response Data:", responseData);

      if (response.ok) {
        alert("Login successful!");

        // **Ensure user data is correctly stored**
        if (responseData.userId) {
          localStorage.setItem("userId", responseData.userId);
        } else {
          console.warn("Warning: userId is missing in the response.");
        }

        if (responseData.userName) {
          localStorage.setItem("userName", responseData.userName);
        } else {
          console.warn("Warning: userName is missing in the response.");
        }

        if (responseData.email) {
          localStorage.setItem("userEmail", responseData.email);
        } else {
          console.warn("Warning: userEmail is missing in the response.");
        }

        if (responseData.token) {
          localStorage.setItem("token", responseData.token);
        } else {
          console.warn("Warning: token is missing in the response.");
        }

        console.log("Redirecting to Rooms...");
        window.location.href = "/Rooms.html";
      } else {
        responseMessage.textContent =
          responseData.message || "Login failed, please try again.";
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
