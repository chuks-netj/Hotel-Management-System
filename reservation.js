document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("roomId");

  if (!roomId) {
    alert("Invalid reservation. Redirecting...");
    window.location.href = "room.html";
    return;
  }

  // Fetch room details
  fetch(`https://localhost:7261/api/Room/${roomId}`)
    .then((response) => response.json())
    .then((room) => {
      document.getElementById("roomType").innerText = room.roomType;
      document.getElementById("roomPrice").innerText = room.price;
      document.getElementById("roomCapacity").innerText = room.capacity;
    })
    .catch((error) => {
      console.error("Error fetching room details:", error);
    });
});

// Function to handle reservation confirmation and redirect to payment
function confirmReservation() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("roomId");

  const CheckInDate = document.getElementById("CheckInDate").value;
  const CheckOutDate = document.getElementById("CheckOutDate").value;

  if (!CheckInDate || !CheckOutDate) {
    alert("Please select both check-in and check-out dates.");
    return;
  }

  if (new Date(CheckInDate) >= new Date(CheckOutDate)) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  // Redirect to payment page with room and date details
  window.location.href = `Payment.html?roomId=${roomId}&checkIn=${CheckInDate}&checkOut=${CheckOutDate}`;
}

//LATEST RESERVATION JS
// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomId = urlParams.get("roomId");

//   if (!roomId) {
//     alert("Invalid reservation. Redirecting...");
//     window.location.href = "availableRooms.html";
//     return;
//   }

//   fetch(`https://localhost:7261/api/Room/${roomId}`)
//     .then((response) => response.json())
//     .then((room) => {
//       document.getElementById("roomType").innerText = room.roomType;
//       document.getElementById("roomPrice").innerText = room.price;
//       document.getElementById("roomCapacity").innerText = room.capacity;
//     })
//     .catch((error) => {
//       console.error("Error fetching room details:", error);
//     });
// });

// function confirmReservation() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomId = urlParams.get("roomId");

//   // Redirect to payment page with necessary details
//   window.location.href = `Payment.html?roomId=${roomId}`;
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomId = urlParams.get("roomId");

//   if (!roomId) {
//     alert("Invalid reservation. Redirecting...");
//     window.location.href = "availableRooms.html";
//     return;
//   }

//   fetch(`https://localhost:7261/api/Room/${roomId}`)
//     .then((response) => response.json())
//     .then((room) => {
//       document.getElementById("roomType").innerText = room.roomType;
//       document.getElementById("roomPrice").innerText = room.price;
//       document.getElementById("roomCapacity").innerText = room.capacity;
//     })
//     .catch((error) => {
//       console.error("Error fetching room details:", error);
//     });
// });

// function confirmReservation() {
//   fetch("https://localhost:7292/Payment") // MVC Controller Action
//     .then((response) => response.text()) // Fetch HTML content
//     .then((html) => {
//       document.getElementById("paymentSection").innerHTML = html; // Inject content
//     })
//     .catch((error) => console.error("Error fetching payment page:", error));
// }

// function redirectToPayment() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomId = urlParams.get("roomId");

//   if (!roomId) {
//     alert("Invalid reservation. Please try again.");
//     return;
//   }

//   // Prepare payment details (modify as needed)
//   const paymentDetails = {
//     //meant to be a fetch request
//     Amount: 5000, // Example amount, replace with actual room price
//     Email: "user@example.com", // Replace with the logged-in user's email
//     Name: "John Doe", // Replace with the logged-in user's name
//   };

//   fetch("https://localhost:7040/Donate/Index", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(paymentDetails),
//   })
//     .then((response) => response.text()) // MVC might return an HTML redirect link
//     .then((url) => {
//       if (url.includes("https://checkout.paystack.com")) {
//         window.location.href = url; // Redirect user to Paystack for payment
//       } else {
//         alert("Payment initialization failed!");
//         console.error("Unexpected response:", url);
//       }
//     })
//     .catch((error) => {
//       console.error("Payment error:", error);
//       alert("An error occurred while processing payment.");
//     });
// }

// function confirmReservation() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomId = urlParams.get("roomId");

//   fetch(`https://localhost:7261/api/ReservationContoller/${roomId}/reserve`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.message.includes("successful")) {
//         alert("Reservation confirmed! Redirecting to payment...");
//         redirectToPayment(); // Redirect user to the payment page
//       } else {
//         alert("Error reserving room.");
//       }
//     })
//     .catch((error) => {
//       console.error("Reservation error:", error);
//     });
// }

// function redirectToPayment() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomId = urlParams.get("roomId");

//   if (!roomId) {
//     alert("Invalid reservation. Please try again.");
//     return;
//   }

//   // Redirect user to the payment service with roomId
//   window.location.href = `https://localhost:7040`;
// }

// function confirmReservation() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const roomId = urlParams.get("roomId");

//   fetch(`https://localhost:7261/api/Reservation/${roomId}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.message.includes("successful")) {
//         alert("Reservation confirmed!");
//         window.location.href = "confirmation.html";
//       } else {
//         alert("Error reserving room.");
//       }
//     })
//     .catch((error) => {
//       console.error("Reservation error:", error);
//     });
// }
