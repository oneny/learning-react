## JWT

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

### 새로고침이나 다른 사이트에 갔다와도 로그인이 안 풀리는 이유

> 추가로 좋은 점: 위와 같은 처리 방식은 `refresh token`을 `1d`로 처리했기 때문에 사용자가 실수로 로그아웃을 깜빡하더라도 하루가 지나면 `403(Forbidden)` 오류를 받게 된다.

```js
// we want to implement in our component
// so we can use a private version of axios
// and use those tokens with it anytime we use that instance of axios
import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
```

<details>
  <summary>get /refresh API</summary>

```js
// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) { this.users = data }
// }
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;
  console.log(cookies);

  // DB에 저장된 refreshToken 비교
  // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403); // Forbidden
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ accessToken, roles });
  });
};

module.exports = { handleRefreshToken };
```

</details>

- 우리 사이트에 사용자가 로그인하고 `refreshToken`에 대한 정보는 쿠키로 있기 때문에
  - 어디를 다녀와도 새로고침을 해도 `get /refresh`로 보내서 해당 API에서 다시 사용자 정보가 담긴 `accessToken`을 보내준다!
- 그리고 다시 `setAuth`를 통해 `auth` 상태에 저장!

### 그리고 PersistLogin을 보자!

```js
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }

    }
    // avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p>Loading...</p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin;
```

- `await refrsh()`를 통해 아까의 과정을 거치고 로그인 인증이 되었으면 자식 컴포넌트(Outlet)을 보여주자!
- `access token`같은 경우는 `localStorage`에 저장하지 않는 것이 좋지만 `persist`같은 경우는 해당 디바이스를 믿냐고 물어보는 단순 boolean이기 때문에 `localStorage`에 저장
  - 로그인 페이지에서 `persist`를 로그인 시 `true`로 만들면 `verifyRefrshToken` 함수에 의해 로그인이 안풀리고 다시 `accessToken`을 받아온다.
  - `persist`를 로그인 시 `false`로 두면 위의 과정없이 유저의 로그인 정보가 사라지게 된다.
