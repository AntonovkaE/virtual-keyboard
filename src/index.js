import './pages/index.css';
import { keysEn } from './utils/keys';

let fragment = new DocumentFragment();
let keyboard = document.createElement('div')
keyboard.classList.add('keyboard')

const textArea = document.createElement('input')
textArea.classList.add('textarea')


function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false;
  }
  return (/^[a-zA-Za-яА-Я]+$/.test(char) && char.length === 1);
}

function toggleSize() {
  const keys = Array.from(document.querySelectorAll('.key_letter'));
  keys.forEach(key => {
    if (/^[a-za-я]+$/.test(key.textContent)) {
      key.textContent = key.textContent.toUpperCase()
    } else {
      key.textContent = key.textContent.toLowerCase()
    }

  })
}


function isWideKey(key, keyElement) {
  switch (key) {
    case 'caps':
      keyElement.classList.add('key_wide');
      keyElement.addEventListener('click', () => {
        toggleSize()
      })
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
    if (charIsLetter(key)) {
      keyElement.classList.add('key_letter')
    }
    isWideKey(key, keyElement)
    keyElement.textContent = key
    keyElement.setAttribute("type", "button");
    keyElement.classList.add("keyboard__key");
    row.appendChild(keyElement);
  })
  keyboard.appendChild(row)
}
fragment.appendChild(textArea)
fragment.appendChild(keyboard)
document.querySelector('body').appendChild(fragment)

