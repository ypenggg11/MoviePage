import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useSessionId from "../hooks/useSessionId";
import AuthContext from "./auth-context";
import { Subject } from "rxjs";

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { createSession$, deleteSession } = useSessionId();
  const user = useMemo(() => new Subject(), []);

  const sessionId = sessionStorage.getItem("sessionId");

  useEffect(() => {
    if (sessionId !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    return () => {};
  }, [
    sessionId,
    /* cancelRequest */
  ]);

  useEffect(() => {
    const subscription = user.subscribe((user) => {
      user &&
        createSession$(user.username, user.password).subscribe((sessionId) => {
          if (sessionId !== "ERROR") {
            sessionStorage.setItem("sessionId", sessionId);
            setIsLoggedIn(true);
            navigate(-1);
          } else {
            setIsLoggedIn(false);
            navigate(0);
            localStorage.setItem("isUserInvalid", true);
          }
        });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [createSession$, user, navigate]);

  const login = (username, password) => {
    user.next({ username, password });
  };

  const logout = () => {
    deleteSession(sessionId && sessionId);
    setIsLoggedIn(false);
    navigate(-1);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, sessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
