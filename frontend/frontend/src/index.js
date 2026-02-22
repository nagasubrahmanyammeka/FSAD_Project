import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// index.js or App.js
import "./i18n"; // <-- This must be at the top

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
