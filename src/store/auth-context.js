import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export default AuthContext;
