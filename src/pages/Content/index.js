import { printLine } from './modules/print';

function selectHandler(e) {
  let text = document.getSelection().toString();
  if (text !== '') {
    createIcon(e, text);
  }
}

function createIcon(e, text) {
  removeIcon(e);
  let icon = document.createElement('div');
  icon.id = 'studyMouseIcon';

  let targetRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  let x = e.x + window.scrollX - 13;
  let y = targetRect.top + targetRect.height + window.scrollY + 1 + 27; // border width 1 + google tranIcon height 27

  icon.innerText = 'S2';
  icon.style.left = x + 'px';
  icon.style.top = y + 'px';

  icon.addEventListener('click', (e) => {
    console.log('selected', text);
    icon.remove();
    e.stopPropagation();

    createBubble(e, targetRect);
  });

  document.body.appendChild(icon);
}

function removeIcon(e) {
  const icon = document.getElementById('studyMouseIcon');
  console.log('icon remove?');
  if (icon !== null && document.getSelection().toString() == '') {
    console.log('yes. remove icon');
    icon.remove();
    e.stopPropagation();
  }
}

function createBubble(e, target) {
  createAnchor(e, target);

  console.log('target', target);

  const bubble = document.createElement('div');
  bubble.id = 'studyMouseBubble';
  let x = target.left + target.width / 2 + window.scrollX;
  let y = target.top + window.scrollY;
  bubble.style.left = x + window.scrollX - 150 + 'px';
  bubble.style.top = y + window.scrollY + 27 + 'px';
}

function createAnchor(e, target) {
  let anchor = document.createElement('div');
  anchor.id = 'studyMouseAnchor';

  let anchorX = target.left;
  let anchorY = target.top;

  anchor.style.left = anchorX + window.scrollX + 'px';
  anchor.style.top = anchorY + window.scrollY + 'px';
  anchor.style.width = target.width + 'px';
  anchor.style.height = target.height + 'px';

  document.body.appendChild(anchor);
}

function removeAnchor() {
  const element = document.getElementById('studyMouseAnchor');

  console.log('icon Anchor?');
  if (element !== null) {
    element.remove();
  }
}

function removeBubble() {
  const element = document.getElementById('studyMouseBubble');

  console.log('bubble Anchor?');
  if (element !== null) {
    element.remove();
  }
}

document.addEventListener('mouseup', selectHandler);
document.addEventListener('click', removeIcon);
document.addEventListener('click', removeAnchor);
document.addEventListener('click', removeBubble);

printLine('Study Mouse is always see your DOM');
