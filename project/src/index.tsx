import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { OFFERS_DATA } from './mock/offers';

const Setting = {
  placeCardCount: 5,
  offers: OFFERS_DATA,
};

ReactDOM.render(
  <React.StrictMode>
    <App placeCardCount={Setting.placeCardCount} offers={Setting.offers} />
  </React.StrictMode>,
  document.getElementById('root'));
