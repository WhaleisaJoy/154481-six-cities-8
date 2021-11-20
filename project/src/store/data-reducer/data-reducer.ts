import { createReducer } from '@reduxjs/toolkit';
import { defaultOffer, SendingCommentStatus } from '../../const';
import { DataReducerType } from '../../types/state';
import { changeSendingCommentStatus, loadComments, loadCurrentOffer, loadOffers, loadOffersNearby } from '../action';

const initialState: DataReducerType = {
  offers: [],
  currentOffer: defaultOffer,
  offersNearby: [],
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
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(changeSendingCommentStatus, (state, action) => {
      state.sendingCommentStatus = action.payload;
    });
});

export {dataReducer};
