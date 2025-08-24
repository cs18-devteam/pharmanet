document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Login form submitted!");
    });
  } else {
    console.error("login form not found!");
  }
});
