document
  .getElementById("applyForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.trim();
    });

    // Basic validation to ensure required fields are filled
    if (
      !data.FirstName ||
      !data.LastName ||
      !data.UserName ||
      !data.Email ||
      !data.Password ||
      !data.PhoneNumber
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:7261/api/UserReg/Register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      let result;
      try {
        result = await response.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        alert("Unexpected server response. Please try again.");
        return;
      }

      console.log("Response Status:", response.status);
      console.log("Response Data:", result);

      if (response.ok) {
        alert("Registration successful! Redirecting...");
        window.location.href = "login.html"; // Redirect to login page
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Something went wrong. Please check your internet connection and try again."
      );
    }
  });
