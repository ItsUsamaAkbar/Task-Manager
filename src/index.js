import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AlertTemplate from 'react-alert-template-basic';
import { transitions, positions, Provider } from 'react-alert';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  offset: '5px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider template={AlertTemplate} {...options}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
