import { printLine } from './modules/print';

function selectHandler(e) {
  let text = document.getSelection().toString();
  if (text !== '') {
    showIcon(e, text);
  }
}

function showIcon(e, text) {
  removeIcon(e);
  let icon = document.createElement('div');
  icon.id = 'studyMouseIcon';

  let targetRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  let x = e.pageX + window.scrollX - 13;
  let y = targetRect.top + targetRect.height + window.scrollY + 1 + 27; // border width 1 + google tranIcon height 27

  icon.innerText = 'S2';
  icon.style.left = x + 'px';
  icon.style.top = y + 'px';

  icon.addEventListener('mousedown', () => {
    console.log('selected Text', text);
    icon.remove();
  });

  document.body.appendChild(icon);
}

function removeIcon(e) {
  const icon = document.getElementById('studyMouseIcon');
  console.log('선택된 텍스트', document.getSelection().toString());

  if (icon !== null && document.getSelection().toString() == '') {
    console.log('hide icon');
    icon.remove();
  }
}

document.addEventListener('mouseup', selectHandler);
document.addEventListener('mousedown', removeIcon);

printLine('Study Mouse is always see your DOM');
