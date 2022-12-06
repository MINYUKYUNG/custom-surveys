# 구글 폼 (Google Form)

## 배포 링크
https://google-form-minyukyung.vercel.app
<br/>
<br/>

## 기술 스택
- React 18 + TypeScript
- React Router
- Redux (redux-toolkit)
- CSS Framwork: Tailwind CSS, daisyUI
<br/>

## About project
1. 구글 폼 만들기

2. 기능 구현
    - 질문, 옵션, 응답, 미리보기 : redux-toolkit 의 state 로 질문, 옵션, 응답 값을 관리하고 dispatch 로 추가, 편집, 복사, 삭제 값을 업데이트
    - 제출 페이지 : redux-toolkit 의 state 로 질문, 옵션, 응답 값을 가져오고, props 로 pointer-events-none 속성을 적용
    - 양식 지우기 : input 의 value, checked 값을 redux-toolkit 의 state 로 관리하여, dispatch 로 응답값을 초기화할 수 있도록 구현
    - 드래그 앤 드롭 : react-beautiful-dnd 를 사용하여 질문과 옵션의 드래그 앤 드롭 기능을 구현하고, dispatch 로 질문, 옵션 순서를 업데이트

3. 서비스 화면 미리보기
    - 메인 페이지 (Create)
    ![create](./src/assets/images/create.png)

    - 미리보기 페이지 (Preview)
    ![preview](./src/assets/images/preview.png)
    
    - 제출 페이지 (Submit)
    ![submit](./src/assets/images/submit.png)
<br/>

## 실행 방법
1. repository clone
```
$ git clone https://github.com/MINYUKYUNG/redux-toolkit-project-g.git
```
2. dependencies install
```
npm install
```
3. project start
```
npm run start
```
<br/>

## 폴더 구조
| 폴더 | 구분 |
| -- | -- |
| assets | font, images, json 등 로컬 파일 폴더 |
| components | 공통 컴포넌트 파일 폴더 |
| constants | 전역적으로 사용하는 상수 파일 폴더 |
| pages | url 주소 페이지 파일 폴더 |
| routes | 리액트 라우팅 파일 폴더 |
| store | 전역상태관리 파일 폴더 |
| utils | 중복 로직 함수를 순수 함수화한 파일 폴더 |
<br/>
