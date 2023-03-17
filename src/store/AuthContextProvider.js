import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionId$, deleteSession } from "../services/fetchUser";
import AuthContext from "./auth-context";

/* Provide the login state, the login and logout functions, and the session id once logged in */
const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  /* Check if there's a  sessionId and updates the login state */
  const sessionId = sessionStorage.getItem("sessionId");

  useEffect(() => {
    if (sessionId !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    return () => {};
  }, [sessionId]);

  /* Login and obtain a session id, saving it on the session storage */
  const login = (username, password) => {
    const subscription = getSessionId$(username, password).subscribe({
      next: (session) => {
        sessionStorage.setItem("sessionId", session);
        navigate(-1);
      },
      error: () => {
        localStorage.setItem("isUserInvalid", true);
        navigate(0);
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  };

  /* Logout */
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
