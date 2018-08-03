import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const login = localStorage.getItem('login');

ReactDOM.render(
  <BrowserRouter>
    <App login={(login === null ? {
      name: '',
      plat: 'pc'
    }:JSON.parse(login))}/>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
