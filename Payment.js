document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("paymentForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // 🔴 Prevent default form submission

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
          window.location.href = data.paymentUrl; // ✅ Redirect to Paystack
        } else {
          alert(data.message || "Payment failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    });
});
