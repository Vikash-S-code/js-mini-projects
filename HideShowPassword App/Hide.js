let Password = document.getElementById("password");
let EyeIcon = document.getElementById("Eye");

EyeIcon.onclick = function () {
  if (Password.type == "password") {
    Password.type = "text";
    EyeIcon.classList.add("newColor");
    EyeIcon.innerHTML = "visibility";
  } else {
    Password.type = "password";
    EyeIcon.classList.remove("newColor");
    EyeIcon.innerHTML = "visibility_off";
  }
};
