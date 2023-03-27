import React from "react";

const ThemeContext = React.createContext({
  isDarkTheme: true,
  onChangeTheme: () => {},
});

export default ThemeContext;
