import { printLine } from './modules/print';

function highlightHandler(e) {
  let text = document.getSelection().toString();
  console.log('e, text', e, text);
  if (text !== '') {
    showIcon(e);
  }
}

function showIcon(e) {
  hideIcon();
  let icon = document.createElement('div');
  icon.classList.add('studyMouseIcon');

  let targetRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  let x = e.pageX + window.scrollX - 13;
  let y = targetRect.top + targetRect.height + window.scrollY + 1 + 27; // border width 1 + google tranIcon height 27

  icon.innerText = 'S2';
  icon.style.left = x + 'px';
  icon.style.top = y + 'px';

  document.body.appendChild(icon);
}

function hideIcon() {
  let icons = document.getElementsByClassName('studyMouseIcon');
  for (let icon of icons) {
    if (icon !== undefined) {
      console.log('hide icon');
      icon.remove();
    }
  }
}

document.addEventListener('mouseup', highlightHandler);
document.addEventListener('mousedown', hideIcon);

printLine('Study Mouse is always see your DOM');
