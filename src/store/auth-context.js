import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  sessionId: undefined,
});

export default AuthContext;
