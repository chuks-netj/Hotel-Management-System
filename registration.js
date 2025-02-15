document
  .getElementById("applyForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    const FirstName = document.getElementById("FirstName").value;
    const LastName = document.getElementById("LastName").value;
    const UserName = document.getElementById("UserName").value;
    const Email = document.getElementById("Email").value;
    const Password = document.getElementById("Password").value;
    const PhoneNumber = document.getElementById("PhoneNumber").value;

    // Create FormData object
    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("UserName", UserName);
    formData.append("Email", Email);
    formData.append("Password", Password); // Attach the file
    formData.append("PhoneNumber", PhoneNumber);

    // Send the formData using fetch
    fetch("https://localhost:7261/api/UserReg/Register", {
      method: "POST",
      body: formData, // Send the FormData object directly
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit application");
        }
        return response.json();
      })
      // .then((data) => {
      //   document.getElementById("responseMessage").textContent =
      //     "Application submitted successfully!";
      // })
      .catch((error) => {
        document.getElementById("responseMessage").textContent =
          "Error creating account.";
        console.error("Error:", error);
      });
  });
