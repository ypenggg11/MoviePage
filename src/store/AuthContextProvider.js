import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionId$, deleteSession } from "../services/fetchUser";
import AuthContext from "./auth-context";

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const sessionId = sessionStorage.getItem("sessionId");

  useEffect(() => {
    if (sessionId !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    return () => {};
  }, [sessionId]);

  const login = (username, password) => {
    const subscription = getSessionId$(username, password).subscribe({
      next: (session) => {
        sessionStorage.setItem("sessionId", session);
        navigate(-1);
      },
      error: () => {
        navigate(0);
        localStorage.setItem("isUserInvalid", true);
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  };

  const logout = () => {
    deleteSession(sessionId && sessionId);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, sessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
