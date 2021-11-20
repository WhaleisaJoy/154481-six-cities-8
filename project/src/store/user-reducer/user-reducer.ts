import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserReducerType } from '../../types/state';
import { requireAuthorization, requireLogout } from '../action';

const initialState: UserReducerType = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {userReducer};
