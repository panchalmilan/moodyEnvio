const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("comment");
const process = document.getElementById("proceed");
const msg = document.querySelector(".msg");

let namePresent = 0;
let emailPresent = 0;
let mobilePresent = 0;
let commentPresent = 0;

name.addEventListener("blur", validateName);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
comment.addEventListener("blur", validateMessage);
process.addEventListener("click", checkFilled);

function validateName() {
  const re = /^[a-zA-Z]{2,10}$/;

  if (!re.test(name.value)) {
    name.classList.add("is-invalid");
    namePresent = 0;
  } else {
    name.classList.remove("is-invalid");
    namePresent = 1;
  }
}

function validateEmail() {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!re.test(email.value)) {
    email.classList.add("is-invalid");
    emailPresent = 0;
  } else {
    email.classList.remove("is-invalid");
    emailPresent = 1;
  }
}

function validatePhone() {
  const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

  if (!re.test(phone.value)) {
    phone.classList.add("is-invalid");
    mobilePresent = 0;
  } else {
    phone.classList.remove("is-invalid");
    mobilePresent = 1;
  }
}

function validateMessage() {
  if (message.value == "") {
    message.classList.add("is-invalid");
    commentPresent = 1;
  } else {
    message.classList.remove("is-invalid");
    commentPresent = 1;
  }
}

function errorMessage(color, messageoutput) {
  msg.classList.add(color);

  msg.innerText = messageoutput;
  setTimeout(() => {
    msg.classList.remove(color);
    msg.innerText = ``;
  }, 2000);
}

function checkFilled(e) {
  e.preventDefault();

  if (
    namePresent == "0" ||
    emailPresent == "0" ||
    mobilePresent == "0" ||
    commentPresent == "0"
  ) {
    errorMessage("error", "Please enter valid details");
    // msg.innerText = '';
  } else {
    errorMessage("sucess", "Your message is received");

    // Clear fields
    name.value = "";
    email.value = "";
    phone.value = "";
    comment.value = "";
    message.value = "";
  }

  console.log(msg);
}
