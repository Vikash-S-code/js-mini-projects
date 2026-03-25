let imgbox = document.getElementById("img-box");
let qrImage = document.getElementById("QRImage");
let qrText = document.getElementById("Qrtext");

console.log(qrText);

function generateQr() {
  if (qrText.value.length > 0) {
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      qrText.value;
    imgbox.classList.add("show-img");
  } else {
    setTimeout(() => {
      qrText.classList.add("error");
    }, 1000);
  }
}
