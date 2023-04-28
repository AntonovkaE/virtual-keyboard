import './pages/index.css';
import { keysEn } from './utils/keys';

let fragment = new DocumentFragment();
let keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
let capsOn = false;
let capsLockKey;

for (let rowNumb in keysEn) {
  let row = document.createElement('div');
  row.classList.add('keyboard__row');
  keysEn[rowNumb].forEach(key => {
    const keyElement = document.createElement('button');
    keyElement.addEventListener('mousedown', () => {
      clickKey(keyElement);
    });
    if (charIsLetter(key)) {
      keyElement.classList.add('key_letter');
    }
    if (key === 'Shift') {
      keyElement.classList.add('key_shift');
      keyElement.addEventListener('click', () => {
        setTimeout(() => {
          capsOn = !capsOn;
          toggleSize();
        }, 500);
      });
    }

    isWideKey(key, keyElement);
    keyElement.textContent = key;
    keyElement.setAttribute('type', 'button');
    keyElement.classList.add('keyboard__key');
    if (key === 'Space') {
      keyElement.textContent = ' '
    }
    if (isChar(key) || key === 'Space' || key === 'Tab') {
      keyElement.addEventListener('click', () => {
        if (keyElement.textContent === 'Tab') {
          addInInput('    ')
          return
        }
        addInInput(keyElement.textContent);
      });
    }
    row.appendChild(keyElement);
  });
  keyboard.appendChild(row);
}

const textArea = document.createElement('textarea');
textArea.classList.add('textarea');
textArea.value = ''
textArea.focus()

function addInInput(char) {
  textArea.value = textArea.value + char;
  console.log(textArea.value)
}

function clickKey(item) {
  if (item.textContent === 'CapsLock') {
    capsOn = !capsOn;
    item.classList.toggle('key_clicked');
    toggleSize();
    return;
  } else if (item.textContent === 'Shift') {
    capsOn = !capsOn;
    toggleSize();
    item.classList.add('key_clicked');
  }
  item.classList.add('key_clicked');
  setTimeout(() => {
    item.classList.remove('key_clicked');
  }, 1000);
}

function isChar(char) {
  return char.length === 1;
}

function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false;
  }
  return (/^[a-zA-Za-яА-Я]+$/.test(char) && char.length === 1);
}

function toggleSize() {
  const keys = Array.from(document.querySelectorAll('.key_letter'));
  keys.forEach(key => {
    if (capsOn) {
      key.textContent = key.textContent.toUpperCase();
    } else {
      key.textContent = key.textContent.toLowerCase();
    }
  });
}

function isWideKey(key, keyElement) {
  switch (key) {
    case 'CapsLock':
      capsLockKey = keyElement;
      keyElement.classList.add('key_wide');
      keyElement.addEventListener('click', () => {
        toggleSize();
      });
    case 'tab':
    case 'Shift':
    case 'enter':
    case 'backspace':
      keyElement.classList.add('key_wide');
      break;
    case 'Space':
      keyElement.classList.add('key_space');
      break;
  }
}

fragment.appendChild(textArea);
fragment.appendChild(keyboard);

document.querySelector('body').appendChild(fragment);
let shiftKeys = Array.from(document.querySelectorAll('.key_shift'));

document.addEventListener('keydown', function (event) {
  textArea.focus()
  console.log(event.code);
  if (event.code === 'ShiftLeft') {
    clickKey(shiftKeys[0]);
    shiftKeys[0].classList.add('key_clicked');
    return;
  } else if (event.code === 'ShiftRight') {
    clickKey(shiftKeys[1]);
    shiftKeys[1].classList.add('key_clicked');
    return;
  }
  const keys = Array.from(document.querySelectorAll('.keyboard__key'));
  keys.map(item => {
    if (item.textContent.toLowerCase() === event.key.toLowerCase()) {
      clickKey(item);
    }
  });
});
document.addEventListener('keyup', (event) => {
  console.log(event);
  if (event.key === 'CapsLock' || event.key === 'Shift') {
    capsOn = !capsOn;
    toggleSize();
    if (event.key === 'CapsLock') {
      capsLockKey.classList.toggle('key_clicked');
    } else if (event.code === 'ShiftLeft') {
      shiftKeys[0].classList.remove('key_clicked');
    } else if (event.code === 'ShiftRight') {
      shiftKeys[1].classList.remove('key_clicked');
    }
  }

});
