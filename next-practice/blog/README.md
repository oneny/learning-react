# Blog

## Link와 a 차이

- `<a href='/posts/first-post'>첫 번째 글</a>`
  - 브라우저의 url에 새로운 주소창을 쳐서 들어간 것과 똑같은 동작
  - Link 태그를 통한 최적화가 적용되지 않는다.
- `<Link href='/posts/first-post'>첫 번째 글</Link>`
  - 페이지 안의 필요한 내용들만 추가적으로 불러온다.

### Client Side Navigate

browser에서 url을 직접 쳐서 이동하는 것과 달리 JS 상에서 page 컴포넌트를 교체하는 것

- 확인(background-color를 body에 주고 navigate 해보기)

### Code Splitting

- Next.js는 Automatic Code Splitting을 제공
  - 특정 페이지에 접근할 때는 해당 페이지를 그릴때 필요한 chunk만 로드
  - 페이지 이동을 할 땐 목적지 페이지에 필요한 chunk만 추가 로드
- 이를 통해 성능이 최적화된다.

### Prefetching

- `<Link>` 컴포넌트를 이용하면, viewport에서 Link 컴포넌트가 노출되었을때 href로 연결된 페이지의 chunk를 로드하여 성능을 최적화한다.

### 태그 쓰는 경우

- 본 서비스 외부 링크로 연결할 때는 `<a>` tag만 쓰면 됨
- Link Component에 스타일을 줄 때는 `<a>` tag에 줘야 함

## Image COmponent

### Image 사용 시 최적화

- Resizing(responsive 사이즈)
- Lazy load(viewport에 들어오면 로드)
- 그 외 optimization(webp 형태)
- CLS(Cumulative Layout Shift): 누적 레이아웃 이동

## Head Component

### Metadata

- 웹 문서로서 제공하는 메타 정보들
  - ex) `<title>제목</title>`

### Head Component

- title / image / description 등 og(open graph) tag
- icon
- third party script (ex. google-analytics..)

### Script Component

- strategy
- onLoad

## Global CSS

`pages/_app.js` 만들고 `styles/global.css` 만들고 전역으로 적용할 스타일을 정의하고 `_app.js`에서 `import '../styles/global.css`하여 적용할 수 있다.

## SSG(build time) vs SSR(request time)

- Next.js에 핵심이 되는 개념
- Next.js를 활용하면 페이지별로 Pre-rendering 방식을 선택할 수 있다.
  - `getStaticProps`를 사용하면 **SSG**
  - `getServerSideProps`를 사용하면 **SSR**

### SSG를 사용하면 좋은 페이지

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

- 적용 여부 선택 기준
- 사용자가 페이지를 **요청하기 전**에 `pre-render`할 수 있는가?
- yes -> SSG
- No -> SSR 혹은 ISR 혹은 CSR

### SSG의 2가지 케이스

- **외부 데이터 없이** pre-rendering
- **외부 데이터를 가져와서** pre-rendering
- 외부 데이터?
  - 다른 파일, API, DB 등..

## Dynamic Routes

SSG를 사용해서  
`url: /posts/ssg-ssr`이면 `posts/ssg-ssr.md`를 읽어서 보여준다.  
`url: /posts/pre-rendering`이면 `posts/pre-rendering.md`를 읽어서 보여준다.

### SSG를 활용해서 다이나믹한 page들을 생성하려면?

- `getStaticPaths`가 필요하다.
- `getStaticPaths`는 생성해둬야 하는 페이지 정보를 배열로 반환해야 한다.

```js
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

- `fallback`의 의미?
  - true, false, "blocking"
  - false: 없는 링크 시 -> 404 페이지
  - true -> 에러 발생
    - 빌드할 때 `getStaticPaths`로 조회했을 때는 없었는데 `getStaticProps`로 조회할 때는 있는 경우에 대한 대응
    - 빌드 타임에 만들어지지 않았던 것이 fallback을 렌더링했다가 `getStaticProps`에서 조회한 데이터가 있다면 알아서 Next가 generation해서 사용자에게 static하게 제공
  - "blocking" -> 다른 에러
    - 빌드 안되어 있어도 기다렸다가 fallback을 그리지 않고 그냥 데이터가 오면 그 때 렌더링
- SSG 시 생성할 목록?
  - getStaticPaths(paths 배열 반환)
- getStaticPaths fallback
  - 빌드시 생성되지 않은 page에 대한 처리

### getStaticProps / getStaticPaths

- server-side에서는 API Routes를 사용하지 않아야 한다.
- getStaticProps나 getStaticPaths 등은 client-side 코드에 포함되지 않는다.
- 그렇기에 서버 사이드에서는 DB에 직접 접근하는 등 훨씬 자유도 높은 작업을 할 수 있다.

## SEO를 위한 도구

robots.txt와 sitemap

- robots.txt는 검색엔진이나 크롤러 등이 이 사이트의 내용을 수집해가도 되는지 권한 체크를 하는 페이지
- sitemap은 도메인 내의 페이지 목록
  - `yarn add -D next-sitemap` 라이브러리 사용
  - package.json의 script 추가
    - 'postbuild': 'next-sitemap'

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'url',
  generateRobotsTxt: true,
};
```

## 댓글 기능

> [utterances](https://utteranc.es/)

- github public repository 필요
  - github의 issues와 comments를 활용하기 때문에
  - [github 마켓플레이스](https://github.com/marketplace)에서 utterances 설치
- utterances 홈페이지에 가서 script 생성
  - issue와 post 매치할 타입 선택
  - script tag를 컴포넌트 중간에 삽입하면 동작을 안함
  - `Utterances` 컴포넌트를 따로 만들어서 script Element를 생성
  - 의도치 않은 re-render가 일어나는 경우, 여러 개가 생기기 떄문에
    - 해당 컴포넌트 memoization 해줘야 한다.

## ESLint

- next에 대한 eslint 설정
  - [ESLint](https://nextjs.org/docs/basic-features/eslint)

## Compiler / Preview Mode

- 컴파일러 -> 언어를 다른 언어로 변환해주는 도구
- Babel / Terser -> Transpiler / Minifier(mangle&compress)
- SWC -> Rust 기반이라 병렬처리가 가능해 빠르다
- Preview Mode -> 쿠키 / getStaticProps를 request time

## Dynamic Import

- [Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)
  - Lazy load로 초기 청크 사이즈 줄이기
  - 컴포넌트를 사용하는 시점에 로드
  - Next.js에서 Image나 Link 태그를 사용할 떄 viewport안에 들어와 사용자가 사용해야할 때 로드하는 방식으로 최적화를 지원한다.

### 컴포넌트를 Lazy load하는 방법

```js
dynamic(() => import('../components/Button'), { suspense: true });
```

By using next/dynamic, the header component will not be included in the page's initial JavaScript bundle. The page will render the Suspense fallback first, followed by the Header component when the Suspense boundary is resolved.

- 외부 라이브러리도 import 함수를 사용해서 dynamic하게 load해서 사용할 수 있다.
  - 예시: blog 안에 있는 [id].js의 Button을 component로 빼기
- Promise resolved되어야 렌더

### Automatic Static Optimization

- 정적인 페이지는 `.html`으로 요청에 맞춰 동작하는 페이지는 `.js`로
- `getInitialProps`나 `getServerSideProps`가 있다면 `.js`
- 알아서 정적 파일과 동적 파일 구분

### router의 query

- client-side 페이지의 경우, hydration 이후에 query 값을 읽을 수 있다.

  ```js
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
  }, [router.query]);
  ```

- 사용자와 인터렉션할 준비가 될 떄까지는 query가 없다고 판단된다.

### Static HTML Export

- [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)
- Next.js 프로젝트를 정적인 파일들만으로 Build하는 것
  - CDN 등에 올려서 서비스를 제공 가능
- 단, Node.js 서버가 있어야지만 동작하는 기능들은 포기해야함
- 의도적으로 정적 파일로 export 가능

## Custom App & Document && Error Page

### Absolute Imports and Module Path Aliases

- [Absolute Imports and Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases)

### Custom App

`_document`와 `_app`에는 페이지에 공통적으로 적용될 내용을 작성하는데 어떻게 다른지 살펴보자.  
`_app`은 서버로 요청이 들어왔을 떄 가장 먼저 실행되는 컴포넌트로, 페이지에 적용할 **공통 레이아웃**의 역할을 한다.

- [Custom App](https://nextjs.org/docs/advanced-features/custom-app)
- Persisting layout between page changes
- Keeping state when navigating pages
- Custom error handling using componentDidCatch
- Inject additional data into pages
- Add global CSS

#### 규칙

- `Component` 속성값은 서버에 요청한 페이지가 된다.
- PageProps는 `getInitialProps`, `getStaticProps`, `getServerSideProps` 중 하나를 통해 페칭한 초기 속성값이 된다.

### Custom Document

`_document`는 `_app` 다음에 실행되며, 공통적으로 활용할 `<head>`(ex. 메타 태그)나 `<body>` 태그 안에 들어갈 내용들을 커스텀할 때 활용한다.

- [Custom App](https://nextjs.org/docs/advanced-features/custom-document)
- `<html><body>`
- `_document`는 server에서 동작 고로, onClick은 동작하지 않음
- `import { Html, Head, Main, NextScript } from 'next/document'`
- not Data Fetching methods

- 폰트 임포트
- charset, 웹 접근성 관련 태그 설정

#### 규칙

- `_document`에서 사용하는 `<Head>` 태그는 next/head가 아닌 next/document 모듈에서 불러와야 한다.
  - `document`의 `<Head>` 태그에는 모든 문서에 공통적으로 적용될 내용(Ex. charset, 뷰포트, 메타태그 등)이 들어가야 한다.
- `_document`는 **언제나 서버에서 실행되므로** 브라우저 api 또는 이벤트 핸들러가 포함된 코드는 실행되지 않는다.
- `<Main />` 부분을 제외한 부분은 브라우저에서 실행되지 않으므로 이곳에 비즈니스 로직을 추가해서는 안되며, `_app`과 마찬가지로 `getStaticProps`와 `getServerSideProps`를 통해 데이터를 불러올 수 없다.

## Performance 측정

> [Web Performance](https://web.dev/vitals)

- Largest Contentful Paint(최대 콘텐츠풀 페인트, LCP): 페이지가 처음으로 로딩된 후 2.5초 이내에 발생
- First Input Delay(최초 입력 지연, FID): 상호 작용을 측정(100밀리초)
- Cumulative Layout Shift(누적 레이아웃 시프트, CLS): 시각적 안정성을 측정(페이지에서 0.1 이하 유지)

### Google을 활용한 Performance 측정

- https://developers.google.com/speed
- https://pagespeed.web.dev/

### Chrome을 활용한 Performance 측정

- Performance
- Lighthouse
- React debug tool profiler

### Measuring Performance

- [Measuring Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
  - reportWebVitals
  - metric.name
  - custom metrics
- 웹서비스에 접근한 사용자의 로그 수집

## Error handling

- [Error handling](https://nextjs.org/docs/advanced-features/error-handling)

- Handling Errors in Development - Overlay
- Handling Server Errors - Custom Error Page
- Handling Client Erorrs - Error Boundaries

- Error -> handled vs unhandled
- Error Handling -> Development / Server / Client
- Error Page Custom -> 404.js / \_error.js / next/error
- Client -> Error Boundary

## React 18

- [React 18](https://reactjs.org/blog/2022/03/29/react-v18.html)

- Automatic Batching / Transitions / New Suspense
- New Client & Server Rendering APIs / Strict Mode
- useId / useTransition / useDeferredValue
- useSyncExternalStore / useInsertionEffect ..

### 동시성

기존에는 상태가 변경되면 update와 렌더링까지 React가 알아서 처리  
React 18부터 update와 렌더링 과정에서 중지가 가능

### React 18 with Next.js

- [React 18 with Next.js](https://nextjs.org/docs/advanced-features/react-18/overview)

### Streaming SSR with Suspense

- https://nextjs.org/docs/advanced-features/react-18/streaming
  - Stream을 활용해서 SSR의 결과물을 업데이트해준다.
  - Suspense children resolved 후 stream
- https://nextjs.org/docs/api-reference/next/streaming
  - client-side에서 server component를 업데이트할 수 있다.

#### 주의사항

- SSR을 활용하면, third party script 로드 시점을 보장할 수 없어진다.
- next/head => next/script
  - `_docuemtn.js`로 옮기고 beforInteractive strategy 적용

#### Server Components

- [Server Components](https://nextjs.org/docs/advanced-features/react-18/server-components)
  - https://github.com/vercel/next-react-server-components
  - React 18에서 페이지가 아닌 컴포넌트 별로 Server Components를 통해 server에서 그릴 것과 그렇지 않는 것들은 client에서 그릴 수 있다.
- [Edge runtime](https://nextjs.org/docs/advanced-features/react-18/switchable-runtime)
  - runtime: node.js / edge
  - ssr streaming을 위해서는 web streams를 서포트해야함...

## Data Fetching API

- [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)
  - async / static method / return serialized data / only in page
  - server-side rendering / SEO
  - disable Automatic Static Optimization
- [getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)
  - export function / pre-render each request
  - not be bundled for the client-side
  - return a object (props or notFound or redirect)
- [getStaticPaths](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)
  - export a function from a page that uses Dynamic Routes
  - statically pre-render all the paths specified by it
  - return paths / fallback (false: 404 / true / 'blocking')
  - ISR은 fallback: 'blocking'이어야 가능
    - false: 새로운 slug 요청이 오더라도 그냥 404 페이지로 이동시킴
    - true: 새로운 slug 요청이 오면 한 번 getStaticPaths를 돌려 있는지 확인
- [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
  - pre-render at build time / not be bundled for the client-side
  - props preview / previewData ...
  - return props / notFound / redirect + revalidate(seconds)
  - read files with process.cwd() (current working directory)

## Router Link API

- 함수형 컴포넌트에서는 useRouter() 사용
  - 클래스 컴포넌트는 withRouter 활용
- pathname / query / asPath / isFallback / basePath / locale / locales / defaultLocale / domainLocales / isReady / isPreview

### push와 replace

- router.push: history가 쌓이는 이동
  - router.push(url, as, options)
- router.replace: history가 쌓이지 않는 이동
  - router.replace(url, as, options)

### prefetch

- router.prefetch: 미리 페치해오기
  - `yarn dev`에서는 동작하지 않음
  - `yarn build & yarn start` 후 `router.push` 해보면 알 수 있음
- router.beforePopState: history popState 때 callback 사용가능
  - return true 하지 않으면 온전히 동작 안함

### back & reload

- router.back: 뒤로가기
- router.reload: 새로고침

### 그 외

- router.events.[on / off]
- routeChangeStart(url, { shallow })
- routeChagneComplete(url, { shallow })
- routeChangeError(error, url, { shallow })
- beforeHistoryChange(url, { shallow })
- hashChangeStart(url, { shallow })
- hashChangeComplete(url, { shallow })

## 기타 Advanced

### Link

- https://nextjs.org/docs/api-reference/next/link
- router의 페이지 이동 기능
- href만 required
- as / passHref / prefetch / replace / scroll / shallow / locale

### Image

- https://nextjs.org/docs/api-reference/next/image
- width / height / layout / loader / sizes / quality / prioriy / placeholder
- style / objectFit / objectPosition / onLoadingComplete / loading
- blurDataURL / lazyBoundary / lazyRoot / unoptimized

### script

- https://nextjs.org/docs/api-reference/next/script
- src / onLoad / onError
- strategy(beforInteractive / afterInteractive / lazyOnload / worker)

### amp

- https://nextjs.org/docs/api-reference/next/script
- accelerated mobile pages의 준말
- 구글에서 만든 모바일에서 훨씬 빠른 페이지

### Data Fetching API

- getInitialProps -> static method / Static optimize X
- getServerSideProps -> request time / props | notFound | redirect
- getStaticPaths -> paths / fallback(false / true / 'blocking')
- getStaticProps -> preview / revalidate / process.cwd()

## configuration

- CRA로 만든 프로젝트에서는 webpack config 등을 커스텀하려면 npm run eject하거나 craco(Create React App Configuration Override) 등을 사용해야 했다.

### next.config.js

However, **none of the configs are required**, and it's **not necessary to understand** what each config does. Instead, search for the features you **need to enable or modify** in this section and they will show you what to do.

- [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)
- It gets used by the Next.js server and build phases.
- 우리가 다뤘던 프로젝트 중에 next.config.js가 필요했던 것은 image-app / server-components
- 유의사항
  - next.config.js는 Webpack, Babel or TypeScript로 parse되지 않으니 최신 js 문법을 사용하면 안된다.]

### 환경변수(Environment Variables)

- [Environment Variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)

### Rewrites

- [Rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
  - source to destination rewrite

### Redirects

- [Redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects)
  - source to destination redirect
  - rewrite와의 차이점: browser 주소창 url의 변경 여부

### CDN Support with Asset Prefix

- [CDN Support with Asset Prefix](https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix)
- CDN에 build 결과물을 올리고 활용할 떄 사용

### Custom Webpack Config

- [Custom Webpack Config](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config)

### Compression

- [Compression](https://nextjs.org/docs/api-reference/next.config.js/compression)

### Runtime Configuration

- [Runtime Configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration)
- next/config 활용해서 getConfig로 serverRuntimeConfig, publicRuntimeCOnfig 찍어보기

### 그 외

- Disabling x-powered-by / ETag Generation / HTTP Keep-Alive
- Setting a custom build directory
  - .next 대신 yarn build 결과물 저장할 경로 지정: distDir: 'build'
  - next-sitemap에도 sourceDir: 'build' 추가해줘야 함
- Configuring the Build ID / onDemandEntries

