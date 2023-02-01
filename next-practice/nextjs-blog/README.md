# Next.js

> Next.js는 모든 페이지를 기본적으로 pre-render한다.

- Initial Load: Pre-rendered HTML is displayed
- JS loads -> Hydration: React components are initialized and App becomes interative
  - If your app hs interactive components like `<Link />`, they'll be active after JS loads

## Next.js가 제공하는 여러 기능들

- page-based routing system(with dynamic routes)
- Pre-rendering SSG / SSR
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- API Routes (with Serverless Functions)
- Development environment (with Fast Refresh)

## Pre-rendering과 SEO의 상관관계

- CSR만 제공한다면, Client(브라우저)처럼 동작하지 않는 검색엔진의 경우 아무런 데이터도 조회해갈 수 없다.
- Pre-render를 해두면 Client철머 동작하지 않는 검색엔진에게 필요한 데이터를 제공할 수 있다.
- In No Pre-rendering (Plain React.js app)
  - Initial Load: App is not rendered
  - JS loads -> Hydration: React components are initialized and App becomes interactive

### Next.js의 Pre-rendering 방식?

- SSG(recommended) && SSR
  - SSG는 빌드 타임에 pre-render, 서버에 부담이 덜하다.
  - SSR은 요청 타임에 pre-render, 요청 시에 Node 서버가 동작을 해서 화면에 pre-render를 한다.

### SSG 2가지 상황

- Page의 내용물이 외부 데이터에 의존적인 상황
  - getStaticProps만 가지고도 가능
- Page Paths까지 외부 데이터에 의존적인 상황
  - getStaticPaths도 함께 활용해야 가능

### Layouts

- 여러 Page들의 공통 처리
- 하나의 공통된 Layout을 쓰는 경우
  - components/Layout.js
  - 컴포넌트 하나를 pages/\_app.js에서 활용하면 됨
- 여러 개의 Layouts를 활용하고 싶은 경우
  - components/SubLayout.js
  - Page.getLayout에 getLayout 함수를 제공

### Images

- Next.js가 제공하는 최적화 Image Component
  - Improved Performance
  - Visual Stability(CLS - Cumulative Layout Shift 방지)
  - Faster Page Loads(viewport 진입 시 로드 / blur 처리)
  - Asset Flexibility(리사이징)

### Layout / Pages / Image 정리

- Pre-render -> SEO와 초기 로딩 속도
- SSG vs SSR -> SSG는 빌드 시 / SSR은 요청 시
- Layout -> pages/\_app.js 활용해서 페이지 공통화
- Images -> 최적화된 이미지 활용 util

## Router

- Next.js의 Router는 file-system 기반
- pages/ 혹은 src/pages
  - 둘 다 있다면 뭐가 우선순위를 가질까? pages가 우선순위가 높음
- Nested routes
  - pages/product/first-item.js -> /product/first-item
  - pages/settings/my/info.js -> settings/my/info

### Shallow Routing

- `getServerSideProps` / `getStaticProps` 등을 다시 실행시키지 않고, 현재 상태를 잃지 않고 url을 바꾸는 방법
- 상태는 유지하면서 url만 바꾸고 싶은 경우?
  - 사용자가 어떤 동작을 했고, 그 기록을 query로 남기고 싶을때 query로 남기면 사용자가 새로고침을 해도 유지된다.
  - Data fetching을 일으키고 싶지 않다면!
- url을 바꾸는 3가지 방식
  - location.replace(url): 로컬 state 유지 안됨(리렌더)
  - router.push(url): 로컬 state 유지 / data fetching은 일어남
  - router.push(url, as, { shallow: true }): 로컬 state 유지 / data fetching X
  - `src/pages/settings/my/info.js` 확인
- 다중 slug -> `[user]/[info].js` / `[...slug].js`
- 옵셔널 slug -> `[[...slug]].js`
- Shallow Routing -> `router.push(url, undefined, { shallow: true })`

## API란?

> Application Programming Interface.  
> 응용 프로그래밍 인터페이스, 컴퓨터와 컴퓨터 프로그램 사이의 연결

### Frontend Service - Backend Service 간의 연결

- Frontend Service는 고객과 닿아있고, Backend Service는 DB에 닿아있다.
- 고객기 DB에 접근하기 위해 FE는 BE와 연결되어야 하고 이때 API를 활용한다.
  - BE가 제공해주는 API를 통해 DB의 내용을 활용할 수 있다.


