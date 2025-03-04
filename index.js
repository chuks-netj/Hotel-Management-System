function setAccessibilityPreference(isVisuallyImpaired) {
  localStorage.setItem("isVisuallyImpaired", isVisuallyImpaired);
  window.location.href = "welcome.html"; // Redirect to the main page
}
