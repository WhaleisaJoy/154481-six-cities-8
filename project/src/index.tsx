import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  placeCardCount: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App placeCardCount={Setting.placeCardCount} />
  </React.StrictMode>,
  document.getElementById('root'));
