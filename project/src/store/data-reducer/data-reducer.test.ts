import { defaultOffer, SendingCommentStatus } from '../../const';
import { changeSendingCommentStatus, dropCurrentOffer, dropOffersNearby, loadComments, loadCurrentOffer, loadOffers, loadOffersFavorite, loadOffersNearby, replaceOffer } from '../action';
import { makeFakeComment, makeFakeOffer } from '../../utils/mock';
import { dataReducer } from './data-reducer';
import { DataReducerType } from '../../types/state';

const initialStoreState: DataReducerType = {
  offers: [],
  currentOffer: defaultOffer,
  offersNearby: [],
  offersFavorite: [],
  comments: [],
  isDataLoaded: false,
  isCurrentOfferLoaded: false,
  sendingCommentStatus: SendingCommentStatus.Initial,
};

const offerA = makeFakeOffer();
const offerB = makeFakeOffer();
const offers = [offerA, offerB];
const currentOffer = makeFakeOffer();
const offerAIsFavorite = {...offerA, isFavorite: true};
const offerAIsNotFavorite = {...offerA, isFavorite: false};
const comments = [makeFakeComment()];

describe('Reducer: dataReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialStoreState);
  });

  it('should update offers by load offers', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, loadOffers(offers)))
      .toEqual({
        ...state,
        offers,
        isDataLoaded: true,
      });
  });

  it('should update currentOffer by load currentOffer', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, loadCurrentOffer(currentOffer)))
      .toEqual({
        ...state,
        currentOffer,
        isCurrentOfferLoaded: true,
      });
  });

  it('should reset currentOffer by drop currentOffer', () => {
    const state = {
      ...initialStoreState,
      currentOffer: makeFakeOffer(),
    };
    expect(dataReducer(state, dropCurrentOffer()))
      .toEqual({
        ...state,
        currentOffer: defaultOffer,
        isCurrentOfferLoaded: false,
      });
  });

  it('should update offersNearby by load offersNearby', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, loadOffersNearby(offers)))
      .toEqual({
        ...state,
        offersNearby: offers,
      });
  });

  it('should reset offersNearby by drop offersNearby', () => {
    const state = {
      ...initialStoreState,
      offersNearby: [makeFakeOffer()],
    };
    expect(dataReducer(state, dropOffersNearby()))
      .toEqual({
        ...state,
        offersNearby: [],
      });
  });

  it('should update offersFavorite by load offersFavorite', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, loadOffersFavorite(offers)))
      .toEqual({
        ...state,
        offersFavorite: offers,
      });
  });

  it('should update comments by load comments', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, loadComments(comments)))
      .toEqual({
        ...state,
        comments,
      });
  });

  it('should update isFavorite of specific offer in offers', () => {
    const state = {
      ...initialStoreState,
      offers: [offerAIsFavorite],
      isDataLoaded: true,
    };
    expect(dataReducer(state, replaceOffer(offerAIsNotFavorite)))
      .toEqual({
        ...state,
        offers: [offerAIsNotFavorite],
      });
  });

  it('should update isFavorite of specific offer in offers and isFavorite of currentOffer', () => {
    const state = {
      ...initialStoreState,
      offers: [offerAIsFavorite],
      currentOffer: offerAIsFavorite,
      isDataLoaded: true,
      isCurrentOfferLoaded: true,
    };
    expect(dataReducer(state, replaceOffer(offerAIsNotFavorite)))
      .toEqual({
        ...state,
        offers: [offerAIsNotFavorite],
        currentOffer: offerAIsNotFavorite,
      });
  });

  it('should update isFavorite of specific offer in offers and isFavorite of specific offerNearby in offersNearby', () => {
    const state = {
      ...initialStoreState,
      offers: [offerAIsFavorite, offerB],
      offersNearby: [offerAIsFavorite],
      isDataLoaded: true,
    };
    expect(dataReducer(state, replaceOffer(offerAIsNotFavorite)))
      .toEqual({
        ...state,
        offers: [offerAIsNotFavorite, offerB],
        offersNearby: [offerAIsNotFavorite],
      });
  });

  it('should update isFavorite of specific offer in offers and isFavorite of specific offerFavorite in offersFavorite', () => {
    const state = {
      ...initialStoreState,
      offers: [offerAIsFavorite, offerB],
      offersFavorite: [offerAIsFavorite],
      isDataLoaded: true,
    };
    expect(dataReducer(state, replaceOffer(offerAIsNotFavorite)))
      .toEqual({
        ...state,
        offers: [offerAIsNotFavorite, offerB],
        offersFavorite: [],
      });
  });

  it('should update sendingCommentStatus to "SENDING" by change sendingCommentStatus', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, changeSendingCommentStatus(SendingCommentStatus.Sending)))
      .toEqual({
        ...state,
        sendingCommentStatus: SendingCommentStatus.Sending,
      });
  });

  it('should update sendingCommentStatus to "SUCCESS" by change sendingCommentStatus', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, changeSendingCommentStatus(SendingCommentStatus.Success)))
      .toEqual({
        ...state,
        sendingCommentStatus: SendingCommentStatus.Success,
      });
  });

  it('should update sendingCommentStatus to "FAIL" by change sendingCommentStatus', () => {
    const state = {...initialStoreState};
    expect(dataReducer(state, changeSendingCommentStatus(SendingCommentStatus.Fail)))
      .toEqual({
        ...state,
        sendingCommentStatus: SendingCommentStatus.Fail,
      });
  });
});
