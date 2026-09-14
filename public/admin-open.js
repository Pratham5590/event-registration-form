function openAdmin() {
  const password = prompt("Enter the admin password:");
  if (password === "admin123") {
    window.location.href = "admin/index.html";
  } else if (password !== null) {
    alert("Incorrect admin password.");
  }
}