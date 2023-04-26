import './pages/index.css';
import { keysEn } from './utils/keys';

let fragment = new DocumentFragment();
let keyboard = document.createElement('div')
keyboard.classList.add('keyboard')



keysEn.forEach(key => {
  const keyElement = document.createElement("button");
  const insertLineBreak = ["backspace", "]", "enter", "\\", "shift"].indexOf(key) !== -1;

  // Add attributes/classes
  keyElement.setAttribute("type", "button");
  keyElement.classList.add("keyboard__key");
  keyboard.appendChild(keyElement);
})

fragment.appendChild(keyboard)
document.querySelector('body').appendChild(fragment)

