import './pages/index.css';
import keysEn from './utils/keys.js';

const fragment = new DocumentFragment();
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
let capsOn = false;
let capsLockKey;
const textArea = document.createElement('textarea');
textArea.classList.add('textarea');
textArea.value = '';
textArea.focus();

function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false;
  }
  return (/^[a-zA-Za-яА-Я]+$/.test(char) && char.length === 1);
}

function toggleSize() {
  const keys = Array.from(document.querySelectorAll('.key_letter'));
  keys.forEach((key) => {
    const letterKey = key;
    letterKey.textContent = capsOn ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
  });
}

function isChar(char) {
  return char.length === 1;
}

function addInInput(char) {
  textArea.value += char;
}

function isWideKey(key, keyElement) {
  /* eslint-disable no-fallthrough */
  switch (key) {
    case 'CapsLock':
      capsLockKey = keyElement;
      keyElement.classList.add('key_wide');
      keyElement.addEventListener('click', () => {
        toggleSize();
      });
    case 'Tab':
    case 'Shift':
    case 'enter':
    case 'backspace':
      keyElement.classList.add('key_wide');
      break;
    case 'Space':
      keyElement.classList.add('key_space');
      break;
    default:
      break;
  }
  /* eslint-enable no-fallthrough */
}

function clickKey(item) {
  if (item.textContent === 'CapsLock') {
    capsOn = !capsOn;
    item.classList.toggle('key_clicked');
    toggleSize();
    return;
  }
  if (item.textContent === 'Shift') {
    capsOn = !capsOn;
    toggleSize();
    item.classList.add('key_clicked');
  }
  item.classList.add('key_clicked');
  setTimeout(() => {
    item.classList.remove('key_clicked');
  }, 1000);
}
Object.keys(keysEn).forEach((rowNumb) => {
  const row = document.createElement('div');
  const arrowContainer = document.createElement('div');
  arrowContainer.classList.add('keyboard_arrows');
  row.classList.add('keyboard__row');
  keysEn[rowNumb].forEach((key) => {
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
    } else if (key === 'backspace') {
      keyElement.addEventListener('click', () => {
        textArea.value = textArea.value ? textArea.value.slice(0, -1) : '';
      });
    }

    isWideKey(key, keyElement);
    keyElement.textContent = key;
    keyElement.setAttribute('type', 'button');
    keyElement.classList.add('keyboard__key');
    if (key === 'Space') {
      keyElement.textContent = ' ';
    }
    if (isChar(key) || key === 'Space' || key === 'Tab') {
      keyElement.addEventListener('click', () => {
        if (keyElement.textContent === 'Tab') {
          addInInput('    ');
          return;
        }
        addInInput(keyElement.textContent);
      });
    }
    if (key === 'AltLeft') {
      keyElement.textContent = 'option';
      keyElement.classList.add('key_alt-left');
    } else if (key === 'AltRight') {
      keyElement.textContent = 'option';
      keyElement.classList.add('key_alt-right');
    } else if (key === 'cmdLeft') {
      keyElement.textContent = 'cmd';
      keyElement.classList.add('key_cmd-left');
    } else if (key === 'cmdRight') {
      keyElement.textContent = 'cmd';
      keyElement.classList.add('key_cmd-right');
    } else if (key === '←') {
      keyElement.classList.add('key_arrow-left');
    } else if (key === '↑') {
      keyElement.classList.add('key_arrow-up');
    } else if (key === '↓') {
      keyElement.classList.add('key_arrow-down');
    } else if (key === '→') {
      keyElement.classList.add('key_arrow-right');
    }
    if (key === '↑' || key === '↓') {
      arrowContainer.appendChild(keyElement);
    } else {
      row.appendChild(keyElement);
    }
  });
  row.appendChild(arrowContainer);
  keyboard.appendChild(row);
});
fragment.appendChild(textArea);
fragment.appendChild(keyboard);

document.querySelector('body').appendChild(fragment);
const shiftKeys = Array.from(document.querySelectorAll('.key_shift'));
const altKeyLeft = document.querySelector('.key_alt-left');
const altKeyRight = document.querySelector('.key_alt-right');
const cmdLeft = document.querySelector('.key_cmd-left');
const cmdRight = document.querySelector('.key_cmd-right');
const arrowUp = document.querySelector('.key_arrow-up');
const arrowDown = document.querySelector('.key_arrow-down');
const arrowLeft = document.querySelector('.key_arrow-left');
const arrowRight = document.querySelector('.key_arrow-right');

document.addEventListener('keydown', (event) => {
  textArea.focus();
  if (event.code === 'ShiftLeft') {
    clickKey(shiftKeys[0]);
    shiftKeys[0].classList.add('key_clicked');
    return;
  }
  if (event.code === 'ShiftRight') {
    clickKey(shiftKeys[1]);
    shiftKeys[1].classList.add('key_clicked');
    return;
  }
  if (event.code === 'AltLeft') {
    clickKey(altKeyLeft);
  } else if (event.code === 'AltRight') {
    clickKey(altKeyRight);
  } else if (event.code === 'MetaLeft') {
    clickKey(cmdLeft);
  } else if (event.code === 'MetaRight') {
    clickKey(cmdRight);
  } else if (event.code === 'ArrowUp') {
    clickKey(arrowUp);
  } else if (event.code === 'ArrowDown') {
    clickKey(arrowDown);
  } else if (event.code === 'ArrowLeft') {
    clickKey(arrowLeft);
  } else if (event.code === 'ArrowRight') {
    clickKey(arrowRight);
  }
  const keys = Array.from(document.querySelectorAll('.keyboard__key'));
  keys.forEach((item) => {
    if (item.textContent.toLowerCase() === event.key.toLowerCase()) {
      return clickKey(item);
    }
    return null;
  });
});
document.addEventListener('keyup', (event) => {
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
