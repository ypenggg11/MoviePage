import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DetailsContextProvider from "./store/DetailsContextProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DetailsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DetailsContextProvider>
  </React.StrictMode>
);
