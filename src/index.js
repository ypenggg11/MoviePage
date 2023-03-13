import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./store/ThemeContextProvider";
import AuthContextProvider from "./store/AuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
