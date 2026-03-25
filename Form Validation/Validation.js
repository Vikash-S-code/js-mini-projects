var nameError = document.getElementById("name-error");
var phoneError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");

function validateName() {
  var name = document.getElementById("contact-name").value;

  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write full name";
    return false;
  }

  nameError.innerHTML = `<img src="tick.png">`;
  return true;
}

function validatephone() {
  var phone = document.getElementById("contact-phone").value;

  if (phone.length == 0) {
    phoneError.innerHTML = "Phone No. is required";
    return false;
  }
  if (phone.length != 10) {
    phoneError.innerHTML = "Phone no should be 10 digit";
    return false;
  }
  if (!phone.match(/^[0-9]{10}$/)) {
    phoneError.innerHTML = "Phone No. is required";
    return false;
  }

  phoneError.innerHTML = `<img src="tick.png">`;
  return true;
}

function validateEmail() {
  var Email = document.getElementById("contact-email").value;

  if (Email.length == 0) {
    emailError.innerHTML = "Email id is required";
    return false;
  }
  if (!Email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    emailError.innerHTML = "Eamil id Invalid";
    return false;
  }

  emailError.innerHTML = `<img src="tick.png">`;
  return true;
}

function validateMessage() {
  var Message = document.getElementById("contact-message").value;

  var required = 30;
  var left = required - Message.length;

  if (left > 0) {
    messageError.innerHTML = left + "more characters required";
    return false;
  }
  messageError.innerHTML = `<img src="tick.png">`;
  return true;
}

function validateForm() {
  if (
    !validateName() ||
    !validatephone() ||
    !validateEmail() ||
    !validateMessage()
  ) {
    submitError.style.display = "block";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);

    submitError.innerHTML = "Please fix error to submit";
    return false;
  }
}
