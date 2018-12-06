function draw() {
  for (let i = 0, textInBox; textInBox = box.children[i], i < 16; i++) {
    textInBox.textContent = array15Sort[i];
    if (i === 15) textInBox.style.visibility = 'hidden';
    else textInBox.style.visibility = 'visible';
    }
};  

function findIndexHiddenEl() {
  let elements = document.querySelector('#game15').querySelectorAll('div');
  for (let i = 0; i < elements.length; i++){
    let text = elements[i].textContent;
    if (text === '0') return i;
  }
}

function swap (index0, index1) { 
  let textContent0 = divGame.children[index0].textContent;
  divGame.children[index0].textContent = divGame.children[index1].textContent;
  divGame.children[index0].style.visibility = 'visible';
  divGame.children[index1].textContent = textContent0;
  divGame.children[index1].style.visibility = 'hidden';
}

function  checkMoveRight (index0, index1) {
  if (index0>=0 && index0 < 3 && index1 > 0 && index1 <= 3) return true;
  else if (index0>=4 && index0 < 7 && index1 > 4 && index1 <= 7) return true;
  else if (index0>=8 && index0 < 11 && index1 > 8 && index1 <= 11 ) return true;
  else if (index0>=12 && index0 < 15 && index1 > 12 && index1 <= 15 ) return true
  else return false;
}

function  checkMoveLeft (index0, index1) {
  if (index0>0 && index0 <= 3 && index1 >= 0 && index1 <= 3) return true;
  else if (index0>4 && index0 <= 7 && index1 >= 4 && index1 <= 7) return true;
  else if (index0>8 && index0 <= 11 && index1 >= 8 && index1 <= 11 ) return true;
  else if (index0>12 && index0 <= 15 && index1 >= 12 && index1 <= 15 ) return true;
  else return false;
}

function chekMove (index0, index1) {
  if (index0>=0 && index0<=15 && index1>=0 && index1<=15) return true;
  else return false;
}

function gameCompleted () {
  let arrayNow = [];
  let complit = false;
  let elements = document.querySelector('#game15').querySelectorAll('div');
  for (let i = 0; i < elements.length; i++){
    arrayNow.push(elements[i].textContent);
  };
  for (let i = 0; i < array15.length; i++){
    if (array15[i] === Number(arrayNow[i])) complit = true;
    else {
      complit = false; 
      break;
    }
  }
  return complit;
}

function addElement (element,text) {
  let el = document.createElement(element);
  el.textContent = text;
  document.querySelector('body').appendChild(el);
}



const box = document.body.appendChild(document.createElement('div'));
document.querySelector('div').setAttribute('id','game15');
const divGame = document.querySelector('#game15');
for (let i = 0; i < 16; i++) box.appendChild(document.createElement('div'));
const array15 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const array15Sort = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(function() {return Math.random()-.5; }).concat('0');
draw();


window.addEventListener('keydown', function(e) {
  let indexHidenEl = findIndexHiddenEl();
  let indexRight = indexHidenEl+1;
  let indexLeft = indexHidenEl-1;
  let indexUp = indexHidenEl-4;
  let indexDown = indexHidenEl+4;
    if (e.keyCode === 39 && checkMoveRight(indexHidenEl,indexRight) && chekMove(indexHidenEl,indexRight)) {
      swap(indexHidenEl,indexRight);
      console.log('right');
    }
    if (e.keyCode === 37 && checkMoveLeft(indexHidenEl,indexLeft) && chekMove(indexHidenEl,indexLeft)) {
      swap(indexHidenEl,indexLeft);
      console.log('left');
    }
    if (e.keyCode === 40 && chekMove(indexHidenEl,indexDown)) {
      swap(indexHidenEl,indexDown);
      console.log('down');
    }
    if (e.keyCode === 38 && chekMove(indexHidenEl,indexUp)) {
     swap(indexHidenEl,indexUp);
     console.log('up');
    }
    if (gameCompleted ()) {
      addElement('p','You win!!!');
    }
});

divGame.addEventListener('click', function(e) {
  let indexHidenEl = findIndexHiddenEl();
  let indexRight = indexHidenEl+1;
  let indexLeft = indexHidenEl-1;
  let indexUp = indexHidenEl-4;
  let indexDown = indexHidenEl+4;
  let childrenRight = document.querySelector('#game15').children[indexRight];
  let childrenLeft = document.querySelector('#game15').children[indexLeft];
  let childrenUp = document.querySelector('#game15').children[indexUp];
  let childrenDown = document.querySelector('#game15').children[indexDown];
    if (e.target === childrenRight) swap(indexHidenEl, indexRight);
    if (e.target === childrenLeft) swap(indexHidenEl, indexLeft);
    if (e.target === childrenUp) swap(indexHidenEl, indexUp);
    if (e.target === childrenDown) swap(indexHidenEl, indexDown);
    if (gameCompleted ()) addElement('p','You win!!!');
});





