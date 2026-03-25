document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("openNotes").addEventListener("click", function () {
    chrome.tabs.query({}, function (tabs) {
      let tabExists = tabs.some((tab) => tab.url.includes("NotesApp.html"));

      if (!tabExists) {
        chrome.tabs.create({ url: "NotesApp.html" });
      } else {
        PageAlreadyExistsError();
      }
    });
  });
});

const PageAlreadyExistsError = () => {
  let textBtn = document.getElementById("openNotes");
  textBtn.innerHTML = "Page Already Existed!";
  textBtn.id = "NewIdopenNotes";

  setTimeout(() => {
    let popUp = document.getElementById("closePopUp");
    if (popUp) {
      textBtn.innerHTML = "Open OpenNotes";
      textBtn.id = "openNotes";
    }
  }, 2500);
};
