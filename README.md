# LearningReact

> 출처: [러닝 리액트: 최적의 리액트 코드를 작성하기 위한 모범 사례와 패턴](http://www.yes24.com/Product/Goods/102277805)

# React Login Form with Authorization

* [프론트에서 로그인 처리 관련 좋은글](https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)

01. 리액트 폼 유효성 검사
02. axios를 사용한 리액트 로그인 인증
03. Role 기반 리액트 라우트 보호
04. JWT(Access/Refresh Token) 방식을 이용한 인증 절차
  * Access Token: Sent as JSON
    * Client stores in memery
    * Do NOT store in local storage or cookie
    * Issued at Authorization
    * Client uses for API Access until expires
    * Verified with Middleware
    * New token issued at Refresh request

  * Refresh Token: Sent as httpOnly cookie
    * Not accessible via JavaScript
    * Must have expiry at some point
    * Issued at Authorization
    * Client uses to request new Access Token
    * verified with endpoint & database
    * Must be allowed to expire or logout
05. 지속 가능한 JWT Tokens 인증