import { Cities } from '../database';
import { commentsData } from '../mock/comments';
import { offersData } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { StateType } from '../types/state';

const initialState = {
  city: Cities.PARIS,
  offers: offersData,
  comments: commentsData,
};

const reducer = (state: StateType = initialState, action: Actions): StateType => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.GetOffers:
      return {...state, offers: action.payload};
    case ActionType.GetComments:
      return {...state, comments: action.payload};
    default:
      return state;
  }
};

export {reducer};
