let progress = document.getElementById("Progress");
let song = document.getElementById("mymusic");
let controlIcon = document.getElementById("controlicon");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (song.paused) {
    song.play();
    controlIcon.innerHTML = "pause";
  } else {
    song.pause();
    controlIcon.innerHTML = "play_arrow";
  }
}

if (song.play) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  controlIcon.innerHTML = "pause";
};
