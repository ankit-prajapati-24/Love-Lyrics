import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
const id = "25830659239-085c4n7pb1jgksvu7i04jih6k035h462.apps.googleusercontent.com";
const SECRET_KEY = "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";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer:rootReducer
})
root.render(
  <Provider store = {store}>
  <BrowserRouter>
  
<GoogleOAuthProvider clientId="109968385356-3r8d1o58i1176mqd0tb3c72vdjo7ecan.apps.googleusercontent.com">
      <App />
</GoogleOAuthProvider>;

      <Toaster></Toaster>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
