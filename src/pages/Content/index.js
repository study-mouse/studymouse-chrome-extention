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

  const closeBtn = document.createElement('div');
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '2px';
  closeBtn.style.right = '2px';
  closeBtn.style.width = '21px';
  closeBtn.style.height = '21px';
  closeBtn.style.opacity = 0.4;
  closeBtn.style.backgroundImage =
    "url('https://ssl.gstatic.com/ui/v1/icons/common/x_8px.png')";

  bubble.appendChild(closeBtn);

  const sourceLangBox = document.createElement('div');

  const sourceLangTitle = document.createElement('p');
  sourceLangTitle.style.fontSize = '11px';
  sourceLangTitle.style.margin = 0;
  sourceLangTitle.style.padding = '5px 0px';
  sourceLangTitle.innerText = '영어';
  sourceLangBox.appendChild(sourceLangTitle);

  const sourceLangContent = document.createElement('p');
  sourceLangContent.style.fontSize = '18px';
  sourceLangContent.style.margin = 0;
  sourceLangContent.style.padding = '5px 0px';
  sourceLangContent.innerText = 'selected origin language';
  sourceLangBox.appendChild(sourceLangContent);

  const targetLangBox = document.createElement('div');

  const targetLangTitle = document.createElement('p');
  targetLangTitle.style.fontSize = '11px';
  targetLangTitle.style.margin = 0;
  targetLangTitle.style.padding = '5px 0px';
  targetLangTitle.innerText = '한국어';
  targetLangBox.appendChild(targetLangTitle);

  const targetLangContent = document.createElement('p');
  targetLangContent.style.fontSize = '18px';
  targetLangContent.style.margin = 0;
  targetLangContent.style.padding = '5px 0px';
  targetLangContent.innerText = '선택된 번역 언어';
  targetLangBox.appendChild(targetLangContent);

  bubble.appendChild(sourceLangBox);
  bubble.appendChild(targetLangBox);

  document.body.appendChild(bubble);
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
