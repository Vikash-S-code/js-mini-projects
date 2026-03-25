let Inp = document.getElementById("Input");
let ShowAns = document.getElementById("ANS");
function sss() {
  let val = Inp.value;

  if (val === "undefined") {
    alert("Plaese enter input!");
    Inp.value = "";
  } else {
    ShowAns.innerHTML = `Your Answwer is <span class="Number">${val}</span> .`;
  }

  setTimeout(() => {
    ShowAns.innerHTML = "";
  }, 2000);
  
}

