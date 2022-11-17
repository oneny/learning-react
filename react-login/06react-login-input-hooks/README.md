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

## React Login Input Hooks for User Form Data

### useLocalStorage hook

```js
import { useState, useEffect } from "react";

// Adding more functionality to useLocalStorage
const getLocalValue = (key, initValue) => {
  // first consideration is if we're not just using react but maybe something like next.js which could be abbreviated as SSR
  // so if it's running on the server we're not going to have the window object so we need to consider that
  if (typeof window === "undefined") return initValue;

  // if a value is already store
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
```

- `Lazy initalize`는 `useState`를 사용하여 state를 초기화하는 과정을 **lazy**하게 실행하는 것이다.
  - 이는 컴포넌트가 매번 렌더링될 때마다 `getLocalValue` 함수가 실행되는 것을 방지하기 위해 사용한다.
  - `useState` 또한 매번 실행되지만 `실제 값을 초기화 하는 것은 최초 1번`만 일어난다.
    - 따라서 리렌더링 과정에서는 state가 바뀌지는 않는 것.
- 하지만 함수가 매번 실행되는 것을 방지하기 위해서 `함수 자체를 값으로 넘기고 리액트가 그 함수를 실행하도록 만들면 된다.`
  - 위 경우는 인자를 전달해줘야 하기 때문에 고차함수로 만들어 줌

### useInput hook

```js
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, reset, attributeObj];
};

export default useInput;
```

- `useLocalStorage` 커스텀 훅을 사용해 유저 이름(또는 아이디)를 localStorage에 저장한다.
- 그리고 attributeObj를 반환해서 `input` 태그에 단축 문법을 사용할 수 있도록 한다.

<details>
  <summary>components/Login.js에 적용</summary>

```js
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  // 원래 있던 페이지로 돌아가기
  // 만약 바로 login 페이지로 들어온거라면 Home 페이지로!
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  // ...

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      resetUser(); // setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          {...userAttribs}
          required
        />

      {/* ... */}
    </section>
  );
}

export default Login;
```

</details>

### useToggle hook

```js
import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (value) => {
    setValue((prev) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };

  return [value, toggle];
};

export default useToggle;
```

- `Context`로 `persist` 상태를 전역으로 관리해야 했던 것을 `useToggle`로 대체할 수 있다.
  - `Login.js`에서 checkbox를 통해 `persist` 상태를 변경할 수 있도록 했다.
- `useLocalStorage` 커스텀 훅을 사용해 `persist`를 `localStorage`에 저장하고,
  - `PersistLogin.js`에서 다시 `useLocalStorage` 훅을 통해 기존 값 있으면 그 값을 반환받도록 한다.

<details>
  <summary>components/PersistLogin.js에 적용</summary>

```js
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false); // 이미 localStorage에 존재한다면 그 값을 persist에 할당한다.

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
    };
    // avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
}

export default PersistLogin;
```

</details>
