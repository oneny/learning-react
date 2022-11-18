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

## React Data Security, Logins, Password, JWTs

### 배포 시 React Dev Tools 막기

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_EV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

- `@fvilers/disable-react-devtools` 패키지를 사용해서 `production`일 때는 사용하지 못하도록 막을 수 있다.

### users 상태에 패스워드 등의 정보까지 저장하지 않기

```js
// components/Users.js
const getUsers = async () => {
  try {
    const response = await axiosPrivate.get("/users");
    const usernames = response.data.map((user) => user.username);
    isMounted && setUsers(usernames);
  } catch (err) {
    console.error(err);
    navigate("/login", { state: { from: location }, replace: true });
  }
};
```

- `response.data`로 상태를 변경하는 경우, 사용자의 모든 정보가 저장되기 때문에 `user.usename`만 저장된 배열로 변경할 수 있도록 한다.
- 근데 처음부터 백엔드에서 username만 있는 데이터를 보내주면 되는 것 아닌가 하는 생각이 든다.

### Front에서 jwt decode하기!

#### authController

```js
// backend/authController.js
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required. " });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // refrshToken은 쿠키로
    res.cookie("jwt", refreshToken, {
      HttpOnly: true,
      SameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    }); // secure: true
    res.json({ accessToken }); // accessToken은 json으로
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { handleLogin };
```

- `accessToken`으로 이미 `roles`에 대한 정보를 보내주기 때문에 중복해서 `roles`에 대한 데이터를 보내주지 말고
- 프론트에서 `jwt-decode` 패키지를 활용하여 accessToken에 대한 decode해서 roles 정보를 저장할 수 있도록 하자.
- `refreshController`에서도 `accessToken`고 `roles` 데이터 보내는 것을 `roles`는 지우자!

#### RequireAuth.js

```js
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

  const roles = decoded?.UserInfo?.roles || [];

  // RequireAuth component can protect all the child components that are nested inside of it.
  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet /> // this one represents any child components of RequireAuth
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace /> // user는 있는데 해당하는 roles가 없는 경우
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
```

- `jwt-decode` 패키지를 사용해서 `accessToken`에 담긴 `roles`를 가져와 같은 동작을 하도록 만들 수 있다.
