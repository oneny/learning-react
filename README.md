# LearningReact

> 출처: [러닝 리액트: 최적의 리액트 코드를 작성하기 위한 모범 사례와 패턴](http://www.yes24.com/Product/Goods/102277805)

# React Login Form with Authorization

> 쿠키에 refreshToken만 저장하고 새로운 accessToken을 받아와 인증에 이용하는 구조에서는 CSRF 취약점 공격을 방어할 수 있다. refreshToken으로 accessToken을 받아도 accessToken을 스크립트에 삽입할 수 없다면 accessToken을 사용해 유저 정보를 가져올 수 없기 때문이다.  
> httpOnly 쿠키 역시 refreshToken만 저장하고 accessToken을 받아와 인증에 이용하는 구조로 CSRF 공격 방어가 가능하다.  
> 출처: [프론트에서 안전하게 로그인 처리하기](https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)

1.  리액트 폼 유효성 검사
2.  axios를 사용한 리액트 로그인 인증
3.  Role 기반 리액트 라우트 보호
4.  JWT(Access/Refresh Token) 방식을 이용한 인증 절차
    - Access Token: Sent as JSON
      - Client stores in memery
      - Do NOT store in local storage or cookie
      - Issued at Authorization
      - Client uses for API Access until expires
      - Verified with Middleware
      - New token issued at Refresh request

    - Refresh Token: Sent as httpOnly cookie
      - Not accessible via JavaScript
      - Must have expiry at some point
      - Issued at Authorization
      - Client uses to request new Access Token
      - verified with endpoint & database
      - Must be allowed to expire or logout

5. [지속 가능한 JWT Tokens 인증](https://github.com/oneny/react-practice/tree/main/react-login/05react-persist-user-login)
6. [로그인 폼에 커스텀 훅 적용](https://github.com/oneny/react-practice/tree/main/react-login/06react-login-input-hooks)
