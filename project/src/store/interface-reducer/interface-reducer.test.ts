import { sortType } from '../../const';
import { Cities } from '../../database';
import { InterfaceReducerType } from '../../types/state';
import { changeCity, changeSort } from '../action';
import { interfaceReducer } from './interface-reducer';

const initialState: InterfaceReducerType = {
  city: Cities.PARIS,
  currentSort: sortType.POPULAR,
};

const NEW_CITY = Cities.AMSTERDAM;
const NEW_SORT = sortType.PRICE_TO_HIGH;

describe('Reducer: interfaceReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(interfaceReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update city to specific city', () => {
    const state = {...initialState};
    expect(interfaceReducer(state, changeCity(NEW_CITY)))
      .toEqual({
        ...state,
        city: NEW_CITY,
      });
  });

  it('should update currentSort to specific sort', () => {
    const state = {...initialState};
    expect(interfaceReducer(state, changeSort(NEW_SORT)))
      .toEqual({
        ...state,
        currentSort: NEW_SORT,
      });
  });
});
