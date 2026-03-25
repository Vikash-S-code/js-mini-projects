const scriptURL =
  "https://script.google.com/macros/s/AKfycbyuflZBB2ELJnJuCRjHlTkALSmCYUWTbxd7h0rx9blXSQllUOvchM3MyKYJlkKI_MRY/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("SecNN");
const Input = document.getElementById("Input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
        msg.innerHTML = "Thank You For Subscribing!";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 2000);
      form.reset()
        // Input.value = "";
    })
    .catch((error) => console.error("Error!", error.message));
});
