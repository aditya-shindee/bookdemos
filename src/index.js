import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js'; // Ensure this is the correct path
import reportWebVitals from './reportWebVitals.js';
import './styles/tailwind.css';
import './firebase-config.js'; // Initializes Firebase
// import './styles/index.css';
// import './styles/components.css';

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


