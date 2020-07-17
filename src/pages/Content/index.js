import { printLine } from './modules/print';

function selectHandler(e) {
  let text = document.getSelection().toString().trim();
  let textArr = text.split(' ');

  if (textArr[0] !== '' && textArr.length == 1) {
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
    icon.remove();
    e.stopPropagation();

    createBubble(e, targetRect, text);
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

async function searchWord(text) {
  var myHeaders = new Headers();
  myHeaders.append('Cookie', 'SameSite=None; Secure'); // TODO: coockie Same origin issue

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const response = await fetch(
    `https://endic.naver.com/searchAssistDict.nhn?query=${text}`,
    requestOptions
  );
  const htmltext = await response.text();
  const dom = document.createElement('html');
  dom.innerHTML = htmltext;

  const boxesWrapper = dom.getElementsByClassName('all_con')[0];
  const boxes = boxesWrapper.getElementsByTagName('div');

  let contexts = [];

  for (let box of boxes) {
    for (let dt of box.getElementsByTagName('dt')) {
      if (dt.classList.contains('last')) continue;
      let context = {
        partOfSpeech: box.getElementsByTagName('h4')[0].innerText,
        mean: dt.innerText.split('.')[1],
      };
      contexts.push(context);
    }
  }

  return contexts;
}

async function createBubble(e, target, text) {
  createAnchor(e, target);
  let contexts = await searchWord(text);

  const bubble = document.createElement('div');
  bubble.id = 'studyMouseBubble';
  let x = target.left + window.scrollX + target.width / 2;
  let y = target.top + window.scrollY;
  bubble.style.left = x + 'px';
  bubble.style.top = y + target.height + 'px';
  bubble.style.maxWidth = '300px';

  // 버블 내를 클릭하면 닫히지 않습니다.
  bubble.addEventListener('mouseup', (e) => {
    console.log('buble click!!');
    e.stopPropagation();
  });
  bubble.addEventListener('click', (e) => {
    console.log('buble click!!');
    e.stopPropagation();
  });

  // 버블 내용을 채웁니다.
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
  sourceLangTitle.classList.add('studyMouseLangTitle');
  sourceLangTitle.innerText = '영어';
  sourceLangBox.appendChild(sourceLangTitle);

  const sourceLangContent = document.createElement('p');
  sourceLangContent.classList.add('studyMouseMean');
  sourceLangContent.innerText = text;
  sourceLangBox.appendChild(sourceLangContent);

  const targetLangBox = document.createElement('div');

  const targetLangTitle = document.createElement('p');
  targetLangTitle.classList.add('studyMouseLangTitle');
  targetLangTitle.innerText = '한국어';
  targetLangBox.appendChild(targetLangTitle);

  const targetContainer = document.createElement('div');
  targetContainer.id = 'targetContainer';

  const pOS = document.createElement('span'); // 타켓 품사
  pOS.id = 'pOS';
  pOS.innerText = contexts[0].partOfSpeech;

  const targetLangContent = document.createElement('p');
  targetLangContent.classList.add('studyMouseMean');
  targetLangContent.style.fontWeight = 500;
  targetLangContent.innerText = contexts[0].mean;

  targetContainer.appendChild(pOS);
  targetContainer.appendChild(targetLangContent);
  targetLangBox.appendChild(targetContainer);

  const contextContainer = document.createElement('div');
  contextContainer.id = 'contextContainer';

  for (const [index, context] of contexts.entries()) {
    if (index === 0) continue;
    const fullContent = document.createElement('div');
    fullContent.style.padding = '3px 0';

    const contextPoS = document.createElement('span');
    contextPoS.id = 'pOS';
    contextPoS.innerText = context.partOfSpeech;

    const contextMean = document.createElement('span');
    contextMean.innerText = context.mean;

    fullContent.appendChild(contextPoS);
    fullContent.appendChild(contextMean);

    contextContainer.appendChild(fullContent);
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'buttonContainer';

  const dashboardBtn = document.createElement('a');
  dashboardBtn.id = 'dashboardBtn';
  dashboardBtn.target = '_blank';
  dashboardBtn.rel = 'noopener noreferrer';
  dashboardBtn.href = 'https://naver.com';
  dashboardBtn.innerText = 'Go to dashboard >';

  const saveBtn = document.createElement('a');
  saveBtn.id = 'saveBtn';
  saveBtn.innerText = 'Save';

  buttonContainer.appendChild(dashboardBtn);
  buttonContainer.appendChild(saveBtn);

  bubble.appendChild(sourceLangBox);
  bubble.appendChild(targetLangBox);
  bubble.appendChild(contextContainer);
  bubble.appendChild(buttonContainer);

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
