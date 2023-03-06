import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import DetailsContextProvider from './store/DetailsContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DetailsContextProvider>
      <App />
    </DetailsContextProvider>
  </React.StrictMode>
);