console.log("payment.js loaded!");
console.log("Retrieved reservation data:", localStorage.getItem("reservation"));

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const reservationData = JSON.parse(localStorage.getItem("reservation"));
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  if (
    !reservationData ||
    !reservationData.roomId ||
    !reservationData.totalPrice
  ) {
    alert("Reservation details are missing. Please make a reservation first.");
    window.location.href = "rooms.html"; // Redirect back to rooms page
    return;
  }

  console.log("Autofilling Amount:", reservationData.totalPrice);
  console.log("Stored userName:", userName);
  console.log("Stored userEmail:", userEmail);

  const nameField = document.getElementById("Name");
  const emailField = document.getElementById("Email");
  const amountField = document.getElementById("Amount");

  if (!nameField || !emailField || !amountField) {
    console.error("One or more input fields not found!");
    return;
  }

  if (!nameField.value) nameField.value = userName || "";
  if (!emailField.value) emailField.value = userEmail || "";
  amountField.value = reservationData.totalPrice;

  setTimeout(() => {
    nameField.dispatchEvent(new Event("input", { bubbles: true }));
    emailField.dispatchEvent(new Event("input", { bubbles: true }));
    amountField.dispatchEvent(new Event("input", { bubbles: true }));
  }, 500);

  document
    .getElementById("paymentForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      let Name = nameField.value.trim();
      let Email = emailField.value.trim();
      let Amount = parseFloat(amountField.value || "0");

      console.log("Form Data Before Submission:", { Name, Email, Amount });

      if (!Name || !Email || Amount <= 0) {
        alert("Please fill in all fields correctly.");
        return;
      }

      await InitializePayment(Name, Email, Amount);
    });
});

// Function to process payment
async function InitializePayment(Name, Email, Amount) {
  const reservationData = JSON.parse(localStorage.getItem("reservation"));
  const userId = localStorage.getItem("userId");

  if (
    !reservationData ||
    !reservationData.roomId ||
    !reservationData.totalPrice
  ) {
    alert("Reservation details are missing. Please try again.");
    return;
  }

  if (!userId) {
    alert("User ID is missing. Please log in again.");
    return;
  }

  // ✅ Define trxRef before using it
  const TrxRef = `HMS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const payload = {
    userId: parseInt(userId, 10),
    roomId: parseInt(reservationData.roomId, 10),
    amount: parseFloat(reservationData.totalPrice), // Ensure the correct amount is used
    email: Email,
    name: Name,
    roomType: reservationData.roomType, // Ensure this value exists
    trxRef: TrxRef,
  };

  console.log("🔹 Sending payment request:", payload);

  try {
    const response = await fetch(
      "https://localhost:7261/api/Payment/initialize",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    console.log("Full API Response:", response);
    console.log("Server response:", result);

    if (response.ok && result.paymentUrl) {
      window.location.href = result.paymentUrl; // Redirect to Paystack
    } else {
      console.error("Payment initialization failed:", result);
      alert(result.message || "Failed to initialize payment.");
    }
  } catch (error) {
    console.error("Error initializing payment:", error);
    alert("An error occurred. Please try again.");
  }
}
