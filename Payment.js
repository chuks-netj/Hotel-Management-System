// Check if Text-to-Speech (TTS) is enabled
const isVisuallyImpaired =
  localStorage.getItem("isVisuallyImpaired") === "true";

// Speak function if TTS is enabled
function speak(text) {
  if ("speechSynthesis" in window && isVisuallyImpaired) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const reservationData = JSON.parse(localStorage.getItem("reservation"));
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  if (
    !reservationData ||
    !reservationData.roomId ||
    !reservationData.totalPrice
  ) {
    speak("Reservation details are missing. Redirecting to rooms page.");
    alert("Reservation details are missing. Please make a reservation first.");
    window.location.href = "rooms.html";
    return;
  }

  const nameField = document.getElementById("Name");
  const emailField = document.getElementById("Email");
  const amountField = document.getElementById("Amount");

  if (!nameField || !emailField || !amountField) {
    console.error("One or more input fields not found!");
    return;
  }

  nameField.value = userName || "";
  emailField.value = userEmail || "";
  amountField.value = reservationData.totalPrice;

  // Provide spoken feedback when focusing on fields
  nameField.addEventListener("focus", function () {
    speak("Please enter your full name.");
  });

  emailField.addEventListener("focus", function () {
    speak("Please enter your email address.");
  });

  amountField.addEventListener("focus", function () {
    speak("This is the total payment amount. You cannot change this.");
  });

  document
    .getElementById("paymentForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      let Name = nameField.value.trim();
      let Email = emailField.value.trim();
      let Amount = parseFloat(amountField.value || "0");

      if (!Name || !Email || Amount <= 0) {
        speak("Please fill in all fields correctly.");
        alert("Please fill in all fields correctly.");
        return;
      }

      await InitializePayment(Name, Email, Amount);
    });
});

async function InitializePayment(Name, Email, Amount) {
  const reservationData = JSON.parse(localStorage.getItem("reservation"));
  const userId = localStorage.getItem("userId");

  if (
    !reservationData ||
    !reservationData.roomId ||
    !reservationData.totalPrice
  ) {
    speak("Reservation details are missing. Please try again.");
    alert("Reservation details are missing. Please try again.");
    return;
  }

  if (!userId) {
    speak("User ID is missing. Please log in again.");
    alert("User ID is missing. Please log in again.");
    return;
  }

  const TrxRef = `HMS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const payload = {
    userId: parseInt(userId, 10),
    roomId: parseInt(reservationData.roomId, 10),
    amount: parseFloat(reservationData.totalPrice),
    email: Email,
    name: Name,
    roomType: reservationData.roomType,
    trxRef: TrxRef,
  };

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

    if (response.ok && result.paymentUrl) {
      speak("Redirecting to payment page.");
      window.location.href = result.paymentUrl;
    } else {
      speak("Payment initialization failed. Please try again.");
      alert(result.message || "Failed to initialize payment.");
    }
  } catch (error) {
    speak("An error occurred. Please try again.");
    console.error("Error initializing payment:", error);
    alert("An error occurred. Please try again.");
  }
}

// console.log("payment.js loaded!");
// console.log("Retrieved reservation data:", localStorage.getItem("reservation"));

// // Check if browser supports Text-to-Speech (Web Speech API)
// if ("speechSynthesis" in window) {
//   console.log("Text-to-Speech is supported!");
// } else {
//   console.log("Text-to-Speech is not supported in this browser.");
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const reservationData = JSON.parse(localStorage.getItem("reservation"));
//   const userName = localStorage.getItem("userName");
//   const userEmail = localStorage.getItem("userEmail");

//   if (
//     !reservationData ||
//     !reservationData.roomId ||
//     !reservationData.totalPrice
//   ) {
//     alert("Reservation details are missing. Please make a reservation first.");
//     window.location.href = "rooms.html"; // Redirect back to rooms page
//     return;
//   }

//   console.log("Autofilling Amount:", reservationData.totalPrice);
//   console.log("Stored userName:", userName);
//   console.log("Stored userEmail:", userEmail);

//   const nameField = document.getElementById("Name");
//   const emailField = document.getElementById("Email");
//   const amountField = document.getElementById("Amount");

//   if (!nameField || !emailField || !amountField) {
//     console.error("One or more input fields not found!");
//     return;
//   }

//   if (!nameField.value) nameField.value = userName || "";
//   if (!emailField.value) emailField.value = userEmail || "";
//   amountField.value = reservationData.totalPrice;

//   setTimeout(() => {
//     nameField.dispatchEvent(new Event("input", { bubbles: true }));
//     emailField.dispatchEvent(new Event("input", { bubbles: true }));
//     amountField.dispatchEvent(new Event("input", { bubbles: true }));
//   }, 500);

//   document
//     .getElementById("paymentForm")
//     .addEventListener("submit", async function (event) {
//       event.preventDefault();

//       let Name = nameField.value.trim();
//       let Email = emailField.value.trim();
//       let Amount = parseFloat(amountField.value || "0");

//       console.log("Form Data Before Submission:", { Name, Email, Amount });

//       if (!Name || !Email || Amount <= 0) {
//         alert("Please fill in all fields correctly.");
//         return;
//       }

//       await InitializePayment(Name, Email, Amount);
//     });
// });

// // Function to process payment
// async function InitializePayment(Name, Email, Amount) {
//   const reservationData = JSON.parse(localStorage.getItem("reservation"));
//   const userId = localStorage.getItem("userId");

//   if (
//     !reservationData ||
//     !reservationData.roomId ||
//     !reservationData.totalPrice
//   ) {
//     alert("Reservation details are missing. Please try again.");
//     return;
//   }

//   if (!userId) {
//     alert("User ID is missing. Please log in again.");
//     return;
//   }

//   // Define trxRef before using it
//   const TrxRef = `HMS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//   const payload = {
//     userId: parseInt(userId, 10),
//     roomId: parseInt(reservationData.roomId, 10),
//     amount: parseFloat(reservationData.totalPrice), // Ensure the correct amount is used
//     email: Email,
//     name: Name,
//     roomType: reservationData.roomType, // Ensure this value exists
//     trxRef: TrxRef,
//   };

//   console.log("🔹 Sending payment request:", payload);

//   try {
//     const response = await fetch(
//       "https://localhost:7261/api/Payment/initialize",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       }
//     );

//     const result = await response.json();

//     console.log("Full API Response:", response);
//     console.log("Server response:", result);

//     if (response.ok && result.paymentUrl) {
//       window.location.href = result.paymentUrl; // Redirect to Paystack
//       speak("Redirecting to payment page.");
//     } else {
//       console.error("Payment initialization failed:", result);
//       alert(result.message || "Failed to initialize payment.");
//     }
//   } catch (error) {
//     console.error("Error initializing payment:", error);
//     alert("An error occurred. Please try again.");
//   }
// }

// // Function to provide text-to-speech feedback
// function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);
//   speechSynthesis.speak(utterance);
// }
