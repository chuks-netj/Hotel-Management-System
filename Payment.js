document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("paymentForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission

      let Name = document.getElementById("Name").value.trim();
      let Email = document.getElementById("Email").value.trim();
      let Amount = parseFloat(document.getElementById("Amount").value);

      if (!Name || !Email || Amount <= 0) {
        alert("Please fill in all fields correctly.");
        return;
      }

      try {
        let response = await fetch(
          "https://localhost:7261/api/Payment/InitializePayment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Name, Email, Amount }),
          }
        );

        let data = await response.json();

        if (data.paymentUrl) {
          // ✅ Store the reference in localStorage
          localStorage.setItem("paymentRef", data.reference);
          window.location.href = data.paymentUrl; // Redirect to Paystack
        } else {
          alert(data.message || "Payment failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    });
  // ✅ Check payment status when user returns
  checkPaymentStatus();
});

// ✅ Function to check payment status
async function checkPaymentStatus() {
  let paymentRef = localStorage.getItem("paymentRef");
  if (!paymentRef) return;

  try {
    let response = await fetch(
      `https://localhost:7261/api/Payment/paystack-webhook`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: paymentRef }),
      }
    );

    let data = await response.json();

    if (data.reference && data.reservationId) {
      window.location.href = `success.html?reference=${data.reference}&reservationId=${data.Id}`;
    } else {
      window.location.href = "failed.html";
    }
  } catch (error) {
    console.error("Error checking payment:", error);
    window.location.href = "failed.html";
  } finally {
    localStorage.removeItem("paymentRef");
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("paymentForm")
//     .addEventListener("submit", async function (event) {
//       event.preventDefault(); // 🔴 Prevent default form submission

//       let Name = document.getElementById("Name").value.trim();
//       let Email = document.getElementById("Email").value.trim();
//       let Amount = parseFloat(document.getElementById("Amount").value);

//       if (!Name || !Email || Amount <= 0) {
//         alert("Please fill in all fields correctly.");
//         return;
//       }

//       try {
//         let response = await fetch(
//           "https://localhost:7261/api/Payment/InitializePayment",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ Name, Email, Amount }),
//           }
//         );

//         let data = await response.json();

//         if (data.paymentUrl) {
//           window.location.href = data.paymentUrl; // ✅ Redirect to Paystack
//         } else {
//           alert(data.message || "Payment failed");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Something went wrong. Please try again.");
//       }
//     });
// });
