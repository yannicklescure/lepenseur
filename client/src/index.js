import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/UserContext';

// Hide all app console.logs
if (process.env.NODE_ENV !== "development") console.log = () => {};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
