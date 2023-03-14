import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionId from "../hooks/useSessionId";
import AuthContext from "./auth-context";

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { createSession, deleteSession, cancel$ } = useSessionId();

  const sessionId = sessionStorage.getItem("sessionId");

  useEffect(() => {
    if (sessionId !== null) {
      setIsLoggedIn(true);
    }

    return () => {
      cancel$.next();
    };
  }, [
    sessionId,
    cancel$,
    /* cancelRequest */
  ]);

  const login = (username, password) => {
    setIsLoggedIn(true);
    // Fetch with rxjs and get session id, and pass it to url as param
    createSession(username, password);
    navigate(-1);
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Remove session id param
    deleteSession(sessionId && sessionId);
    navigate(-1);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, sessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
