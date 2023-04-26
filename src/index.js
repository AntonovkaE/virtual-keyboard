import './pages/index.css';
import { keysEn } from './utils/keys';

let fragment = new DocumentFragment();
let keyboard = document.createElement('div')
keyboard.classList.add('keyboard');
let capsOn = false
let capsLockKey;

const textArea = document.createElement('textarea')
textArea.classList.add('textarea')

function addInInput (char) {
  textArea.value = textArea.value + char
}

function clickKey(item) {
  if (item.textContent === 'CapsLock') {
    toggleSize(item)
  }
  item.classList.add('key_clicked')
  setTimeout(() => {
    if (item.textContent !== 'CapsLock') item.classList.remove('key_clicked')
  }, 1000)
}

function isChar (char) {
 return char.length === 1
}


function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false;
  }
  return (/^[a-zA-Za-яА-Я]+$/.test(char) && char.length === 1);
}

function toggleSize(capsKey) {
  const keys = Array.from(document.querySelectorAll('.key_letter'));
  keys.forEach(key => {
    if (capsOn) {
      capsKey.classList.add('key_clicked')
      key.textContent = key.textContent.toUpperCase()
    } else {
      capsKey.classList.remove('key_clicked')
      key.textContent = key.textContent.toLowerCase()
    }

  })
}


function isWideKey(key, keyElement) {
  switch (key) {
    case 'CapsLock':
      capsLockKey = keyElement;
      keyElement.classList.add('key_wide');
      keyElement.addEventListener('click', () => {
        toggleSize(keyElement)
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
    keyElement.addEventListener('click', () => {
      clickKey(keyElement)
    })
    if (charIsLetter(key)) {
      keyElement.classList.add('key_letter')
    }

    isWideKey(key, keyElement)
    keyElement.textContent = key
    keyElement.setAttribute("type", "button");
    keyElement.classList.add("keyboard__key");

    if (isChar(key)) {
      keyElement.addEventListener("click", () => {
        addInInput(keyElement.textContent)
      })
    }
    row.appendChild(keyElement);
  })
  keyboard.appendChild(row)
}
fragment.appendChild(textArea)
fragment.appendChild(keyboard)
document.querySelector('body').appendChild(fragment)

document.addEventListener('keydown', function(event) {
  capsOn = event.getModifierState("CapsLock")
  if (event.key === 'CapsLock') {
    toggleSize(capsLockKey)
  }

  const keys = Array.from(document.querySelectorAll('.keyboard__key'))
  keys.map(item => {
    if (item.textContent.toLowerCase() === event.key.toLowerCase()) {
      clickKey(item)
    }
  })
});
document.addEventListener('keyup', (event) => {
  capsOn = event.getModifierState("CapsLock")
  if (event.key === 'CapsLock') {

    toggleSize(capsLockKey)
  }
})
