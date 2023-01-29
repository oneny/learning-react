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

- 외부 데이터 없이 pre-rendering
- 외부 데이터를 가져와서 pre-rendering
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


