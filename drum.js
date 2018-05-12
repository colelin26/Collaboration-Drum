window.addEventListener('keydown', playSound)
window.addEventListener('click', changeButton)

var change = false; // indicates if we need to change the key of the buttom
var id;

function playSound(e) {
  if (change === false) {
    const audio = document.querySelectorAll(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelectorAll(`.key[data-key="${e.keyCode}"]`);
      if(!audio) return;//
      audio.forEach(function (each) {
        each.currentTime=0;//
        each.play();
      });
      key.forEach(function (each){
        each.classList.add('playing');
      });
    } else {
      console.log(String.fromCharCode(e.keyCode));
      console.log(id);
      change = false;
      let btn = document.querySelector(`#${id}`);
      btn.innerHTML=`<kbd>${String.fromCharCode(e.keyCode)}</kbd>`;

      let dataKey = btn.parentElement.attributes[0].value;
      console.log(dataKey);

      const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
      const key = document.querySelector(`.key[data-key="${dataKey}"]`);
      audio.setAttribute("data-key", e.keyCode);
      key.setAttribute("data-key", e.keyCode);
    }
  }


function changeButton(btn) {
  change = true;
  console.log(btn);
  var backup = id;
  id = btn.id;
  if (id === undefined) id = backup;
  btn.innerHTML="?";
}

// ${String.fromCharCode(e.keyCode)}
function removeTransition(e){
  if(e.propertyName !== 'transform') return; //skip if it is not a transform
  this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
