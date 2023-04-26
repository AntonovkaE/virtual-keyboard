import './pages/index.css';
import { keysEn } from './utils/keys';

let fragment = new DocumentFragment();
let keyboard = document.createElement('div')
keyboard.classList.add('keyboard')

function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false;
  }
  return (/^[a-zA-Za-яА-Я]+$/.test(char) && char.length === 1);
}

function isWideKey(key, keyElement) {
  switch (key) {
    case 'tab':
    case 'shift':
    case 'enter':
    case 'backspace':
      keyElement.classList.add('key_wide');
      break;
    case 'space':
      keyElement.classList.add('key_space');
      break;
  }
}

for (let rowNumb in keysEn) {
  let row = document.createElement('div')
  row.classList.add('keyboard__row')
  keysEn[rowNumb].forEach(key => {
    const keyElement = document.createElement("button");
    isWideKey(key, keyElement)
    keyElement.textContent = key
    keyElement.setAttribute("type", "button");
    keyElement.classList.add("keyboard__key");
    row.appendChild(keyElement);
  })
  keyboard.appendChild(row)
}

fragment.appendChild(keyboard)
document.querySelector('body').appendChild(fragment)

