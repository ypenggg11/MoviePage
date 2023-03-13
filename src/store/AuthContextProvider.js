import React, { useState } from "react";
import useSessionId from "../hooks/useSessionId";
import AuthContext from "./auth-context";

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { sessionId, getRequestKey } = useSessionId();

  const login = (username, password) => {
    setIsLoggedIn(true);
    getRequestKey(username, password);
  };

  console.log(sessionId);

  const register = (username, password) => {};

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
