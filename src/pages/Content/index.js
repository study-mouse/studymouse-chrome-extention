import { printLine } from './modules/print';

function highlightHandler(e) {
  console.log('drag start');
  let text = document.getSelection().toString();
  if (text !== '') {
    showIcon(e);
  }
}

function showIcon(e) {
  let icon = document.createElement('div');
  icon.classList.add('studyMouseIcon');

  let targetRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  console.log('targetRect', targetRect);
  let x = targetRect.left + window.scrollX;
  let y = targetRect.top + targetRect.height + window.scrollY + 1;

  icon.innerText = 'S2';
  icon.style.left = x + 'px';
  icon.style.top = y + 'px';

  document.body.appendChild(icon);
}

function hideIcon() {
  let icon = document.getElementsByClassName('studyMouseIcon')[0];
  if (icon !== undefined) {
    console.log('icon', icon);
    // icon.remove();
  }
}

document.addEventListener('dragend', highlightHandler);
// document.addEventListener('click', hideIcon);

printLine('Study Mouse is always see your DOM');
