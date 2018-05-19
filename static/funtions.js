var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

var keypushed = {
  clap: false,
  hihat: false,
  kick: false,
  openhat: false,
  openhat: false,
  boom: false,
  ride: false,
  snare: false,
  tom: false,
  tink: false
}

socket.emit('new player');
setInterval(function() {
  socket.emit('keypushed', keypushed);
}, 1000 / 60);


window.addEventListener('keydown', playSound)

var change = false; // indicates if we need to change the key of the buttom
var id;
var cl;
var backup;

function playSound(e) {
  if (change === false) {
    const audio = document.querySelectorAll(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelectorAll(`.key[data-key="${e.keyCode}"]`);
      if(!audio) return;//
      audio.forEach(function (each) {
        keypushed[each.className]=true;
        each.currentTime=0;//
        each.play();
      });
      key.forEach(function (each){
        each.classList.add('playing');
      });
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

  console.log(btn);

  console.log(btn.parentElement);

  var cl = btn.parentElement.querySelector(".sound").className.split(' ')[1];
  console.log(cl);
  if (cl===undefined) return;
  backup = cl;
  console.log(cl);

  btn.innerHTML="?";
}

// ${String.fromCharCode(e.keyCode)}
function removeTransition(e){
  if(e.propertyName !== 'transform') return; //skip if it is not a transform
  this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
