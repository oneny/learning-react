import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // we wouldn't use local storage for access tokens or refresh tokens
  // and we're not this is only going to hold a boolean to say
  // whether we trust this device or not and that'just fine for local storage
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;