import { createReducer } from '@reduxjs/toolkit';
import { defaultOffer, SendingCommentStatus } from '../../const';
import { DataReducerType } from '../../types/state';
import { changeSendingCommentStatus, loadComments, loadCurrentOffer, loadOffers, loadOffersFavorite, loadOffersNearby, replaceOffer } from '../action';

const initialState: DataReducerType = {
  offers: [],
  currentOffer: defaultOffer,
  offersNearby: [],
  offersFavorite: [],
  comments: [],
  isDataLoaded: false,
  isCurrentOfferLoaded: false,
  sendingCommentStatus: SendingCommentStatus.NotSent,
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isCurrentOfferLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadOffersFavorite, (state, action) => {
      state.offersFavorite = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(replaceOffer, (state, action) => {
      const modifiedOffer = action.payload;
      const index = state.offers.findIndex((offer) => offer.id === modifiedOffer.id);

      if ( index !== -1 ) {
        state.offers[index].isFavorite = modifiedOffer.isFavorite;
      }

      if (state.currentOffer !== defaultOffer) {
        state.currentOffer.isFavorite = modifiedOffer.isFavorite;
      }
    })
    .addCase(changeSendingCommentStatus, (state, action) => {
      state.sendingCommentStatus = action.payload;
    });
});

export {dataReducer};
