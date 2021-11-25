import { createReducer } from '@reduxjs/toolkit';
import { defaultOffer, SendingCommentStatus } from '../../const';
import { DataReducerType } from '../../types/state';
import { changeSendingCommentStatus, dropCurrentOffer, dropOffersNearby, loadComments, loadCurrentOffer, loadOffers, loadOffersFavorite, loadOffersNearby, replaceOffer } from '../action';

const initialState: DataReducerType = {
  offers: [],
  currentOffer: defaultOffer,
  offersNearby: [],
  offersFavorite: [],
  comments: [],
  isDataLoaded: false,
  isCurrentOfferLoaded: false,
  sendingCommentStatus: SendingCommentStatus.Initial,
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
    .addCase(dropCurrentOffer, (state) => {
      state.currentOffer = defaultOffer;
      state.isCurrentOfferLoaded = false;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(dropOffersNearby, (state) => {
      state.offersNearby = [];
    })
    .addCase(loadOffersFavorite, (state, action) => {
      state.offersFavorite = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(replaceOffer, (state, action) => {
      const modifiedOffer = action.payload;

      const fitFromOffers = state.offers.find((offer) => offer.id === modifiedOffer.id);
      const fitFromOffersNearby = state.offersNearby.find((offer) => offer.id === modifiedOffer.id);
      const fitFromOffersFavorite = state.offersFavorite.find((offer) => offer.id === modifiedOffer.id);

      if (fitFromOffers) {
        fitFromOffers.isFavorite = modifiedOffer.isFavorite;
      }

      if (fitFromOffersNearby) {
        fitFromOffersNearby.isFavorite = modifiedOffer.isFavorite;
      }

      if (fitFromOffersFavorite) {
        state.offersFavorite = state.offersFavorite.filter((offer) => offer.id !== fitFromOffersFavorite.id);
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
