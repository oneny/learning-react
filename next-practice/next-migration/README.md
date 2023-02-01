# Migrating from Create-React-App

> [Migrating from Create-React-App](https://nextjs.org/docs/migrating/from-create-react-app)

## CRA로 만든 리액트 프로젝트를 Next.js로 마이그레이션

- CRA / CNA -> create-react-app / create-next-app
- Next.js 공식문서 -> 마이그레이션 가이드가 있음
- 스크립트 등 몇 가지 -> 간결한 수정으로 convert 가능
- react eject한 경우 -> 대부분 custom 설정을 Next.js 기본 제공

## Updating `package.json` and dependencies

- `react-scripts` 제거
  - yarn remove react-scripts
- next 설치
  - yarn add next
- package.json 수정
  - "dev": "next dev"
  - "build": "next build"
  - "start": "next start"
- .gitignore 수정
  - .next 추가
- pages/\_document.js 커스텀
  - [Custom Document](https://nextjs.org/docs/advanced-features/custom-document)

### pages 폴더 생성

- public 폴더 수정
- index.html 분리하기
- pages/\_document.js, pages/\_app.js로 옮기기
- styles/global.css 생성 및 스타일 코드 옮기고 \_app.js에서 import
- `<img>` 태그를 `<Image>`로 변경

### react eject를 한 프로젝트라면?

- CSS, SASS, other assets 등 file loader 설정했다면? Next.js 기본 제공
- polyfill이나 신규 JS feature를 추가했다면? Next.js 기본 제공
- code splitting 설정했다면? Next.js 기본 제공
- PostCSS setup 했다면? Next.js 기본 제공
- Babel config / Webpack config 설정했다면? Next.js 기본 제공

### 그 외 Next.js가 기본 제공하는 것들

* `@loadable/server`, `@loadable/babel-plugin`, `@loadable/webpack-plugin` 등
* scroll restoration도 `next/link`와 `next/router`를 사용하면 기본 제공