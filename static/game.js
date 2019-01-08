var socket = io();
var change = false; // indicates if we need to change the key of the buttom
var cl; // the name of the changed buttom
var recording = false; // indicating if we are recording the music

var music = {
  sound: [],
  time: []
};

// Look for the keydown event
window.addEventListener("keydown", handleKey);

// play the coresponding sounds
function playSounds(class_name) {
  const audio = document.querySelectorAll(`audio.${class_name}`);
  const key = document.querySelectorAll(`#${class_name}`);
  if (!audio) return;
  audio.forEach(function(each) {
    each.currentTime = 0;
    each.play();
  });
  key.forEach(function(each) {
    keypar = each.parentElement;
    console.log(keypar);
    keypar.classList.add("playing");
  });
}

// handle the keydown event
function handleKey(e) {
  // emits the pressed key
  if (change === false) {
    const audio = document.querySelectorAll(`audio[data-key="${e.keyCode}"]`);
    audio.forEach(function(each) {
      const class_name = each.className;
      socket.emit("audio", class_name);
      if (recording === true) {
        console.log(music);
        music.sound.push(class_name);

        music.time.push(
          Number(seconds.innerHTML) * 1000 + Number(tens.innerHTML) * 10
        );
      }
    });
    // change the key
  } else {
    console.log(String.fromCharCode(e.keyCode));
    console.log(cl);
    const btn = document.querySelector(`#${cl}`);
    console.log(btn);
    const btnPar = btn.parentElement;
    btnPar.querySelector(`#${cl}`).innerHTML = `<kbd>${String.fromCharCode(
      e.keyCode
    )}</kbd>`;
    btnPar.setAttribute("data-key", e.keyCode);

    const audio = document.querySelector(`audio[class="${cl}"]`);

    audio.setAttribute("data-key", e.keyCode);
    change = false;
  }
}

// Change the the Button(Key) that the user uses to input messages
function changeButton(btn) {
  change = true;
  cl = btn.parentElement.querySelector(".sound").className.split(" ")[1];
  btn.innerHTML = "?";
}

// Remove the transition animation
function removeTransition(e) {
  if (e.propertyName !== "transform") return; //skip if it is not a transform
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

// Timer
window.onload = function() {
  var seconds = 00;
  var tens = 00;
  const appendTens = document.getElementById("tens");
  const appendSeconds = document.getElementById("seconds");
  const appendJSONMusic = document.getElementById("jsonmusic");
  const buttonStart = document.getElementById("record");
  const buttonPlay = document.getElementById("play");
  // const buttonStop = document.getElementById('button-stop');
  const buttonReset = document.getElementById("reset");
  var Interval;

  buttonStart.onclick = function() {
    if (recording === false) {
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
      buttonStart.innerHTML = "Finish";
      recording = true;
    } else {
      buttonStart.innerHTML = "Record";
      clearInterval(Interval);
      tens = "00";
      seconds = "00";
      appendTens.innerHTML = tens;
      appendSeconds.innerHTML = seconds;
      recording = false;
      console.log(appendJSONMusic.innerHTML);
      appendJSONMusic.innerHTML = JSON.stringify(music);
      music.sound = [];
      music.time = [];
    }
  };

  buttonPlay.onclick = function() {
    let x = appendJSONMusic.innerHTML;
    music = JSON.parse(x);
    for (let i = 0; i < music.sound.length; i++) {
      console.log(music.sound[i]);
      console.log(music.time[i]);
      setTimeout(function() {
        socket.emit("audio", music.sound[i]);
      }, music.time[i]);
    }
  };

  buttonReset.onclick = function() {
    buttonStart.innerHTML = "Record";
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    appendJSONMusic.innerHTML = "";
    recording = false;
    music.sound = [];
    music.time = [];
  };

  function startTimer() {
    tens++;
    if (tens < 9) {
      appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
      appendTens.innerHTML = tens;
    }
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }
  }
};

// client side socketIO
// showing the current player number
socket.emit("new player");

socket.on("audio", function(audio) {
  playSounds(audio);
});

socket.on("a user connected", function(x) {
  var online = document.querySelector(".h3");
  online.innerHTML = `Online: ${x}`;
});

socket.on("a user disconnected", function(x) {
  var online = document.querySelector(".h3");
  online.innerHTML = `Online: ${x}`;
});
