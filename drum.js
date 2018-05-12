window.addEventListener('keydown', playSound)
window.addEventListener('click', changeButton)

var change = false; // indicates if we need to change the key of the buttom
var keyNeedChange;//

function playSound(e) {
  if (change === false) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
      if(!audio) return;//
      audio.currentTime=0;//
      audio.play();
      key.classList.add('playing');
    } else {
      console.log(String.fromCharCode(e.keyCode));
      console.log(keyNeedChange);
      keyNeedChange.innerHTML=`<kbd>${String.fromCharCode(e.keyCode)}</kbd>`;
      change = false;
    }
}

function changeButton(btn) {
  change = true;
  keyNeedChange = btn;
  btn.innerHTML q="<kbd>?</kbd>";
}

// ${String.fromCharCode(e.keyCode)}
function removeTransition(e){
  if(e.propertyName !== 'transform') return; //skip if it is not a transform
  this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
