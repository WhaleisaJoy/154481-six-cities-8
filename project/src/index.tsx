import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offersData } from './mock/offers';

const Setting = {
  placeCardCount: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App placeCardCount={Setting.placeCardCount} offers={offersData} />
  </React.StrictMode>,
  document.getElementById('root'));
