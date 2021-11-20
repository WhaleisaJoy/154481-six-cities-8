import { sortType } from '../../const';
import { Cities } from '../../database';
import { Actions, ActionType } from '../../types/action';
import { InterfaceReducerType } from '../../types/state';

const initialState: InterfaceReducerType = {
  city: Cities.PARIS,
  currentSort: sortType.POPULAR,
};

const interfaceReducer = (state = initialState, action: Actions): InterfaceReducerType => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload};
    default:
      return state;
  }
};

export {interfaceReducer};
