const form = document.querySelector("#register");

form.addEventListener(async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const regClass = document.querySelector("#class").value;
  const school = document.querySelector("#school").value;
  const email = document.querySelector("#email").value;
  const response = await fetch("/public", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      name,
      regClass,
      school,
      email
    }
  });
  const data = await response.json();
  if (response.ok) {
    form.style.display = "none";
    const confirm = document.createElement("p");
    confirm.classList.add("confirm");
    confirm.textContent = "Your registration is under review. Please check your email regularly for updates."
  } else {
    const confirm = document.createElement("p");
    confirm.classList.add("confirm-wrong");
    confirm.textContent = "We were unable to process your registration. Please try again."
  }
})