let Speech = new SpeechSynthesisUtterance();

let voices = [];
let voicesselect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  Speech.voice = voices[0];

  voices.forEach(
    (voice, i) => (voicesselect.options[i] = new Option(voice.name, i))
  );
};

voicesselect.addEventListener("change", () => {
  Speech.voice = voices[voicesselect.value];
});


document.querySelector("button").addEventListener("click", () => {
  Speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(Speech);
});
