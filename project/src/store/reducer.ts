import { Cities } from '../database';
import { Actions, ActionType } from '../types/action';
import { StateType } from '../types/state';

const initialState = {
  city: Cities.PARIS,
  offers: [],
};

const reducer = (state: StateType = initialState, action: Actions): StateType => {
  switch (action.type) {
    case ActionType.ChooseCity:
      return {...state, city: action.payload};
    case ActionType.GetOffers:
      return {...state, offers: action.payload};
    default:
      return state;
  }
};

export {reducer};
