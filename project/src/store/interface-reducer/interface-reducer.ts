import { createReducer } from '@reduxjs/toolkit';
import { sortType } from '../../const';
import { Cities } from '../../database';
import { InterfaceReducerType } from '../../types/state';
import { changeCity, changeSort } from '../action';

const initialState: InterfaceReducerType = {
  city: Cities.PARIS,
  currentSort: sortType.POPULAR,
};

const interfaceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.currentSort = action.payload;
    });
});

export {interfaceReducer};
