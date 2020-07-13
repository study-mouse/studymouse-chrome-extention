# Study mouse chrome extention

Study Mouse의 Chrome Extention 저장소 입니다.

# install

```shell
$ git pull https://github.com/study-mouse/studymouse-chrome-extention.git master
$ npm install
$ npm start
```

# Load extention

```shell
$ npx webpack
```

먼저 `build` 폴더를 생성합니다.

그리고, [크롬 익스텐션 관리탭](chrome://extensions/) 에서 `개발자 모드`를 켠 뒤 `압축 해제된 확장 프로그램을 로드합니다.` 를 선택해

위에서 생성된 `build` 폴더를 로드 해 주세요.

현재 프로젝트엔 HMR 이 적용되어 있기 때문에, `npm start` 가 되어있다면, 결과가 자동으로 bundling 되므로

변경사항을 저장하고 [크롬 익스텐션 관리탭](chrome://extensions/)에서 Study Mouse 카드의 새로고침 아이콘을 눌러 변경사항을 확인 가능합니다.
