import React, { useContext } from "react";

import styles from "./ThemeButton.module.css";
import ThemeContext from "../../store/theme-context";

const ThemeButton = () => {
  const themeContext = useContext(ThemeContext);

  const changeThemeHandler = () => {
    themeContext.onChangeTheme();
  };

  return (
    <label className={styles.switch}>
      <input type='checkbox' onChange={changeThemeHandler} checked={!themeContext.isDarkTheme}/>
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default React.memo(ThemeButton);
