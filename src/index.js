// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Make sure this is correctly imported
import store from './store/store.js'; // Import your store
import App from './App'; // Import your App component

const root = ReactDOM.createRoot(document.getElementById('root'));

// Ensure that your App component is wrapped with the Provider and store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
