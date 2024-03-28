function _(id) {
  return document.getElementById(id);
}

function _c(classname) {
  return document.getElementsByClassName(classname);
}
const wr = _("work-range");
const sr = _("short-range");
const lr = _("long-range");
const WORKTIME = _("work-time-count");
const SHORTTIME = _("Short-time-count");
const LONGTIME = _("Long-time-count");
const TIME = _("time");
var audio = new Audio("piep.mp3");
wr.addEventListener('input', function() {
  _("play").classList.replace('fa-pause', 'fa-play-circle-o');
  start = 0;
  WORKTIME.textContent = this.value;
  disp(this.value);
  clearInterval(startWork);
  if (wr.value >= 1) {
    workTime = (wr.value * 60) - 1;
  } else {
    workTime = (wr.value * 60);
  }
});

sr.addEventListener('input', function() {
  SHORTTIME.textContent = this.value;
});

lr.addEventListener('input', function() {
  LONGTIME.textContent = this.value;
});

function audioPlay() {
  if (_("sound").checked) {
    audio.play();
  }
}
function disp(x) {
  TIME.textContent = x + ":00";
}
let start = 0;
_("play").addEventListener('click', function() {
  start += 1;
  if (start % 2 == 0) {
    // console.log("stop",start,this.classList);
    this.classList.replace('fa-pause', 'fa-play-circle-o');
    clearInterval(startWork);
    clearInterval(startBreak);
    clearInterval(startLong);
  } else if (start === 1) {
    this.classList.replace('fa-play-circle-o', 'fa-pause');
    if (wr.value >= 1) {
      workTime = (wr.value * 60) - 1;
    } else {
      workTime = (wr.value * 60);
    }
    startWork = setInterval(workTimer, 1000);
    // console.log("start",start,this.classList);
  }
  else {
    this.classList.replace('fa-play-circle-o', 'fa-pause');
    workTime = sValue;
    startWork = setInterval(workTimer, 1000);
    // console.log("start",start,this.classList);
  }
});

_("mode").addEventListener('change', function() {
  _c("bg")[0].classList.toggle("bg1");
});

_("restart").addEventListener('click', function() {
  location.reload();
});
let workTime;
let breakTime;
let longTime;
let startBreak;
let startWork;
let startLong;
let count = 0;
function workTimer() {
  let minutes = Math.floor(workTime / 60);
  let seconds = Math.floor(workTime % 60);
  if (workTime === 0) {
    count++;
    console.log(count);
    clearInterval(startWork);
    TIME.textContent = "00:00";
    if (count === _("longTimeBreak").value) {
      count = 0;
      audioPlay();
      if(_("mode").checked){
        _c("bg")[0].style.backgroundColor="black";
      }
      else{
        _c("bg")[0].style.backgroundColor = `rgb(57,112,151)`;
      }
      _("work").textContent = "LongBreak";
      if (longTime >= 1) {
        longTime = (lr.value * 60) - 1;
      }
      else {
        longTime = (lr.value * 60);
      }
      startLong = setInterval(longTimer, 1000);
    } else {
      audioPlay();
      if(_("mode").checked){
        _c("bg")[0].style.backgroundColor="black";
      }
      else{
       _c("bg")[0].style.backgroundColor = `rgb(186,73,72)`; 
      }
      _("work").textContent = "break";
      if (breakTime >= 1) {
        breakTime = (sr.value * 60) - 1;
      }
      else {
        breakTime = (sr.value * 60);
      }
      startBreak = setInterval(breakTimer, 1000);
    }
  } else {
    TIME.textContent = minutes + ":" + seconds;
    stopValue(workTime);
    workTime -= 1;
  }
}
function breakTimer() {
  let minutes = Math.floor(breakTime / 60);
  let seconds = Math.floor(breakTime % 60);
  // console.log(breakTime,minutes,seconds);
  if (breakTime === 0) {
    clearInterval(startBreak);
    _("work").textContent = "work";
    TIME.textContent = "00:00";
    if (wr.value >= 1) {
      workTime = (wr.value * 60) - 1;
    } else {
      workTime = (wr.value * 60);
    }
    audioPlay();
    if(_("mode").checked){
      _c("bg")[0].style.backgroundColor="black";
    }
    else{
      _c("bg")[0].style.backgroundColor = `rgb(56,133,139)`;
    }
    startWork = setInterval(workTimer, 1000);
  }
  else {
    TIME.textContent = minutes + ":" + seconds;
    stopValue(breakTime);
    breakTime -= 1;
  }
}
function longTimer() {
  let minutes = Math.floor(longTime / 60);
  let seconds = Math.floor(longTime % 60);
  if (longTime === 0) {
    clearInterval(startLong);
    audioPlay();
    if(_("mode").checked){
      _c("bg")[0].style.backgroundColor="black";
    }
    else{
      _c("bg")[0].style.backgroundColor = `rgb(56,133,139)`;
    }
    _("work").textContent = "work";
    TIME.textContent = "00:00";
    startWork = setInterval(workTimer, 1000);
  }
  else {
    TIME.textContent = minutes + ":" + seconds;
    stopValue(longTime);
    longTime -= 1;
  }
}
let sValue;
function stopValue(x) {
  sValue = x;
}