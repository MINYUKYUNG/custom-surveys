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
    - 질문 추가, 편집, 복사, 삭제, 순서 변경 기능

    - 응답 미리 보기, 양식 지우기, 제출 하기 기능 

3. 프로젝트 구성
    ```
    1) 컴포넌트, 폴더 구성
    질문 생성과 응답 작성으로 역할을 구분하여, 컴포넌트와 폴더를 분리하였습니다.  
    관심사의 분리를 위해 타이틀&설명 컴포넌트를 추가로 분리하였습니다.
    구조의 통일성을 위해 타이틀&설명을 생성하는 컴포넌트와 사용하는 컴포넌트로 구분하여 폴더를 구성하였습니다.

    2) 상태 관리
    질문과 응답 값을 묶어, 상태값을 관리하였습니다.
    타이틀&설명, 질문&응답으로 관심사를 분리하여 컴포넌트 및 폴더를 구성하였기 때문에, 구조의 통일성을 위하여 상태값도 동일한 기준으로 분리하였습니다.
    ```

4. 서비스 화면 미리보기
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
