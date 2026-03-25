let toastbox = document.getElementById("Toast-box");
let SuccessMsg = ` <span class="material-symbols-outlined">
check_circle </span>   Successfully submitted `;

let errorMsg = ` <span class="material-symbols-outlined">
cancel</span> please fix the error!`;

let invalidMsg = `<span class="material-symbols-outlined">
error</span> Invalid input . check again`;

function showToast(msg) {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = msg;
  toastbox.appendChild(toast);

  if(msg.includes('error')){
    toast.classList.add('error')
  }
  if(msg.includes('Invalid')){
    toast.classList.add('invalid')
  }


  setTimeout(()=>{
    toast.remove();
  },6000)
}
