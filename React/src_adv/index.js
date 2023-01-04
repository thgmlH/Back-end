import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Youtube from './Youtube';

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  //render를 사용하여 리액트 컴포넌트 보여줌
  <>
    <App youtube={youtube}/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
