let video = document.getElementById("video");
let source = document.getElementById("video-source");
let tool = document.getElementById("tool");
let controls = document.getElementById("video-controls");
let vidDuration = document.getElementById("vid-duration");
let volume = document.getElementById("inp-volume");
let volumeIco = document.getElementById("volume-ico");
let fullScreen = document.getElementById("full-screen");
let playIco = document.getElementById("controls-pp");
let maxTime = document.getElementById("max-time");
let currentTime = document.getElementById("current-time");
let myTimer;

let oldVolumeValue = 0;

window.onload = () => {
  video.addEventListener("click", playPause);
  tool.addEventListener("click", playPause);
  vidDuration.addEventListener("input", changeDuration);
  video.addEventListener("timeupdate", updateCurrentTime);
  volume.addEventListener("input", changeVolume);
  fullScreen.addEventListener("click", toggleFullScreen);
  playIco.addEventListener("click", playPause);
  volumeIco.addEventListener("click", volumeControls);
  video.addEventListener("timeupdate", (e) => {
    saniyeFormatla(video.currentTime, true);
  });
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) {
      e.preventDefault();
      playPause();
    }
  });
  funcControls();
};

function updateCurrentTime(e) {
  vidDuration.value = e.target.currentTime;
}

function playPause(e) {
  if (video.paused) {
    tool.classList.remove("paused");
    tool.classList.add("resume");
    tool.innerHTML = `<i class='bx bx-play'></i>`;
    playIco.innerHTML = `<i class='bx bx-play'></i>`;
    video.play();
  } else {
    tool.classList.add("paused");
    tool.classList.remove("resume");
    tool.innerHTML = `<i class='bx bx-pause'></i>`;
    playIco.innerHTML = `<i class='bx bx-pause'></i>`;
    video.pause();
  }
}

function changeDuration(e) {
  video.currentTime = e.target.value;
  saniyeFormatla(video.currentTime, true);
}

function changeVolume(e) {
  video.volume = e.target.value / 100;
  oldVolumeValue = video.volume;
  changeVolumeIcon(video.volume);
}

function volumeControls(e) {
  if (video.volume === 0) {
    console.log(oldVolumeValue);
    video.volume = oldVolumeValue;
    volume.value = oldVolumeValue * 100;
  } else {
    video.volume = 0;
    volume.value = 0;
  }
  changeVolumeIcon(video.volume);
}

function changeVolumeIcon(currentLevel) {
  if (currentLevel === 0) {
    volumeIco.className = `bx bx-volume-mute`;
  } else if (currentLevel * 100 <= 50) {
    volumeIco.className = `bx bx-volume-low`;
  } else {
    volumeIco.className = `bx bx-volume-full`;
  }
}

function funcControls() {
  video.volume = volume.value / 100;
  oldVolumeValue = video.volume;
  vidDuration.setAttribute("max", video.duration);
  vidDuration.setAttribute("value", video.currentTime);
  changeVolumeIcon(video.volume);
  saniyeFormatla(video.duration, false);
}
function toggleFullScreen(e) {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function saniyeFormatla(duration, isCurrentDuration) {
  const minute = Math.floor(duration / 60);
  const second = Math.floor(duration % 60);

  const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
  const formattedSecond = second < 10 ? `0${second}` : `${second}`;

  if (isCurrentDuration) {
    currentTime.innerHTML = `${formattedMinute}:${formattedSecond}`;
  } else {
    maxTime.innerHTML = `${formattedMinute}:${formattedSecond}`;
  }
}
