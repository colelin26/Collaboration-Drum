
var socket = io();

var change = false; // indicates if we need to change the key of the buttom

var cl; // the name of the changed buttom
var backup; // perform a backup check for cl


// Look for the keydown event
window.addEventListener('keydown', handleKey)

// play the coresponding sounds
function playSounds(class_name) {
  const audio = document.querySelectorAll(`audio.${class_name}`);
  const key = document.querySelectorAll(`#${class_name}`);
  console.log(audio);
  console.log(key);
    if(!audio) return;//
    audio.forEach(function (each) {
      console.log(each);
      each.currentTime=0;//
      each.play();
    });
    key.forEach(function (each){
      keypar = each.parentElement;
      console.log(keypar);
      keypar.classList.add('playing');
    });
};


// handle the keydown event
function handleKey(e) {
  // emits the pressed key
  if (change === false) {
    const audio = document.querySelectorAll(`audio[data-key="${e.keyCode}"]`);
      audio.forEach(function (each) {
        var class_name = each.className;
        socket.emit('audio', class_name);
      });
      // change the key
    } else {
      console.log(backup);
      cl = backup;
      console.log(cl);
        if (cl === undefined) {
          cl = backup;
          console.log(cl);
        }
      console.log(String.fromCharCode(e.keyCode));
      console.log(cl);
      let btn = document.querySelector(`#${cl}`);
      console.log(btn);
      let btnPar = btn.parentElement;
      btnPar.querySelector(`#${cl}`).innerHTML=`<kbd>${String.fromCharCode(e.keyCode)}</kbd>`;
      btnPar.setAttribute("data-key", e.keyCode);

      const audio = document.querySelector(`audio[class="${cl}"]`);

      audio.setAttribute("data-key", e.keyCode);
      change = false;
    }
  }

// Change the the Button(Key) that the user uses to input messages
function changeButton(btn) {
  change = true;
  var cl = btn.parentElement.querySelector(".sound").className.split(' ')[1];
  if (cl===undefined) return;
  backup = cl;
  btn.innerHTML="?";
}

// ${String.fromCharCode(e.keyCode)}
function removeTransition(e){
  if(e.propertyName !== 'transform') return; //skip if it is not a transform
  this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

// client side socketIO
// indicating a new player logged in
socket.emit('new player');

socket.on('audio', function(audio) {
  playSounds(audio);
});

socket.on('a user connected', function(x) {
  var online = document.querySelector(".h3");
  online.innerHTML=`Online: ${x}`;
});

socket.on('a user disconnected', function(x) {
  var online = document.querySelector(".h3");
  online.innerHTML=`Online: ${x}`;
});
