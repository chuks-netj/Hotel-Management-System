document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get("reference");

  if (!reference) {
    document.getElementById("status").innerHTML =
      "Invalid transaction reference.";
    return;
  }

  try {
    const response = await fetch(
      `https://localhost:7261/api/Payment/verify-payment?reference=${reference}`
    );
    const data = await response.json();

    if (response.ok) {
      document.getElementById("status").innerHTML = "✅ Payment Successful!";
      document.getElementById("transactionId").innerText = reference;
      document.getElementById("amount").innerText = `${data.amount} NGN`;
      document.getElementById("email").innerText = data.customer;
    } else {
      document.getElementById(
        "status"
      ).innerHTML = `❌ Payment Failed: ${data.message}`;
    }
  } catch (error) {
    document.getElementById("status").innerHTML =
      "⚠️ Error retrieving payment details.";
    console.error("Error fetching payment verification:", error);
  }
});

// // document.addEventListener("DOMContentLoaded", async () => {
// //   const urlParams = new URLSearchParams(window.location.search);
// //   const reference = urlParams.get("reference");

// //   if (!reference) {
// //     document.getElementById("message").innerText = "Invalid payment reference!";
// //     return;
// //   }

// //   try {
// //     const response = await fetch(
// //       `https://localhost:7261/api/Payment/verify?reference=${reference}`
// //     );
// //     const data = await response.json();

// //     if (response.ok && data.message.includes("Payment successful")) {
// //       document.getElementById("message").innerText = "✅ Payment Successful!";
// //       document.getElementById(
// //         "details"
// //       ).innerText = `Reference: ${data.reference}, Amount: ₦${data.amount}, Customer: ${data.customer}`;
// //     } else {
// //       window.location.href = "failed.html"; // Redirect if payment failed
// //     }
// //   } catch (error) {
// //     console.error("Error verifying payment:", error);
// //     window.location.href = "failed.html"; // Redirect on error
// //   }
// // });

// // document.addEventListener("DOMContentLoaded", async () => {
// //   const urlParams = new URLSearchParams(window.location.search);
// //   const reference = urlParams.get("reference"); // Get payment reference from URL

// //   if (!reference) {
// //     document.getElementById("status").innerText = "Invalid payment reference!";
// //     return;
// //   }

// //   try {
// //     // Replace 'https://your-api-url' with your actual API base URL
// //     const response = await fetch(
// //       `https://localhost:7261/api/Payment/verify?reference=${reference}`
// //     );
// //     const data = await response.json();

// //     if (response.ok) {
// //       document.getElementById("status").innerText = "✅ Payment successful!";
// //     } else {
// //       window.location.href = "failed.html"; // Redirect to failure page
// //     }
// //   } catch (error) {
// //     console.error("Error verifying payment:", error);
// //     window.location.href = "failed.html"; // Redirect on error
// //   }
// // });

// // const reference = localStorage.getItem("payment_reference");

// // if (!reference) {
// //   console.error("No payment reference found.");
// // } else {
// //   fetch(`https://localhost:7261/api/Payment/verify?reference=${reference}`)
// //     .then((response) => response.json())
// //     .then((data) => {
// //       if (data.message && data.message.includes("✅ Payment successful")) {
// //         localStorage.setItem("payment_response", JSON.stringify(data));
// //         window.location.href = "success.html";
// //       } else {
// //         console.error("Payment verification failed:", data);
// //       }
// //     })
// //     .catch((error) => console.error("Error verifying payment:", error));
// // }
