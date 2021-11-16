import { AuthorizationStatus, sortType } from '../const';
import { Cities } from '../database';
import { commentsData } from '../mock/comments';
import { Actions, ActionType } from '../types/action';
import { StateType } from '../types/state';

const initialState = {
  city: Cities.PARIS,
  offers: [],
  comments: commentsData,
  currentSort: sortType.POPULAR,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state: StateType = initialState, action: Actions): StateType => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    case ActionType.GetComments:
      return {...state, comments: action.payload};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload};
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
