import React from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

localforage.config({
  name: process.env.REACT_APP_LOCAL_FORAGE_BASE_NAME,
  version: 1,
  storeName: process.env.REACT_APP_LOCAL_FORAGE_STORE_NAME,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
