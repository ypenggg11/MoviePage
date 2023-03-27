import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./store/ThemeContextProvider";
import AuthContextProvider from "./store/AuthContextProvider";
import { LoaderComponent } from "./components";

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Suspense fallback={<LoaderComponent />}>
            <App />
          </Suspense>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
