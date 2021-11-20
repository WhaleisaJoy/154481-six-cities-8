import { AuthorizationStatus, defaultOffer, SendingCommentStatus, sortType } from '../const';
import { Cities } from '../database';
import { Actions, ActionType } from '../types/action';
import { StateType } from '../types/state';

const initialState = {
  offers: [],
  currentOffer: defaultOffer,
  offersNearby: [],
  comments: [],
  isDataLoaded: false,
  isCurrentOfferLoaded: false,
  sendingCommentStatus: SendingCommentStatus.NotSent,
  authorizationStatus: AuthorizationStatus.Unknown,
  city: Cities.PARIS,
  currentSort: sortType.POPULAR,
};

const reducer = (state: StateType = initialState, action: Actions): StateType => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    case ActionType.LoadCurrentOffer:
      return {
        ...state,
        currentOffer: action.payload,
        isCurrentOfferLoaded: true,
      };
    case ActionType.LoadOffersNearby:
      return {...state, offersNearby: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    case ActionType.ChangeSendingCommentStatus:
      return {...state, sendingCommentStatus: action.payload};
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload};
    default:
      return state;
  }
};

export {reducer};
